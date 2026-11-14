import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { MobileScreen } from "@/components/layout";
import { Button, IconButton } from "@/components/ui";
import { saveCreativeWork, toJpeg } from "@/lib/creativeWorks";

type Phase = "starting" | "live" | "preview" | "no-camera";

/**
 * Full-screen camera for «Creativity work»: take a photo of your drawing, poem, … →
 * check it → «Add to gallery» saves it and returns to Social impact, where it shows first.
 * If the browser can't open the camera (no permission, no camera, not HTTPS),
 * it falls back to the phone's own camera / photo picker.
 */
export default function CreativeCamera() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [phase, setPhase] = useState<Phase>("starting");
  const [shot, setShot] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Each camera request gets a number; a request that finishes after we've moved on
  // (closed the screen, retaken, React dev double-mount) releases its camera at once.
  const requestRef = useRef(0);

  const stopCamera = () => {
    requestRef.current += 1;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  };

  async function startCamera() {
    stopCamera();
    const request = requestRef.current;
    setPhase("starting");
    if (!navigator.mediaDevices?.getUserMedia) return setPhase("no-camera");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" }, width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false,
      });
      if (request !== requestRef.current) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
      setPhase("live");
    } catch {
      if (request === requestRef.current) setPhase("no-camera");
    }
  }

  useEffect(() => {
    startCamera();
    return stopCamera; // always release the camera when leaving
  }, []);

  function capture() {
    const v = videoRef.current;
    if (!v || !v.videoWidth) return;
    setShot(toJpeg(v));
    stopCamera();
    setPhase("preview");
  }

  function fromFile(file: File | undefined) {
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      setShot(toJpeg(img));
      URL.revokeObjectURL(img.src);
      setPhase("preview");
    };
    img.src = URL.createObjectURL(file);
  }

  function retake() {
    setShot(null);
    setError(null);
    startCamera();
  }

  function addToGallery() {
    if (!shot) return;
    if (!saveCreativeWork(shot)) {
      setError("Your phone's storage for this site is full. Remove some photos and try again.");
      return;
    }
    navigate("/social#creativity-work");
  }

  return (
    <MobileScreen area="social" className="h-dvh overflow-hidden bg-ink">
      <div className="relative flex min-h-0 flex-1 flex-col">
        {/* Viewfinder / preview fills the screen */}
        <video
          ref={videoRef}
          playsInline
          muted
          className={phase === "live" ? "absolute inset-0 size-full object-cover" : "hidden"}
          aria-label="Camera view"
        />
        {phase === "preview" && shot && (
          <img src={shot} alt="Your photo" className="absolute inset-0 size-full object-contain" />
        )}
        {phase === "starting" && (
          <p className="m-auto text-body text-on-ink-muted" role="status">
            Opening the camera …
          </p>
        )}
        {phase === "no-camera" && (
          <div className="m-auto flex max-w-72 flex-col items-center gap-4 px-6 text-center text-white">
            <p className="text-lead">The camera can't open here.</p>
            <p className="text-caption text-on-ink-muted">Allow camera access in your browser, or take the photo with your phone's camera.</p>
            <Button variant="area" onClick={() => fileRef.current?.click()}>
              Take a photo
            </Button>
            <button type="button" className="text-caption text-white underline underline-offset-4" onClick={startCamera}>
              Try again
            </button>
          </div>
        )}

        {/* Top bar over the image */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 pt-4">
          <IconButton icon="close" label="Close camera" onClick={() => navigate("/social#creativity-work")} className="border-white bg-ink/40 text-white" />
          <span className="rounded-pill bg-ink/40 px-3 py-1 text-caption text-white">Creativity work</span>
          <span className="size-10" aria-hidden="true" />
        </div>
      </div>

      {/* Bottom controls */}
      <div className="flex min-h-36 flex-col items-center justify-center gap-3 px-6 pt-5 pb-[max(env(safe-area-inset-bottom),28px)]">
        {phase === "live" && (
          <>
            <button
              type="button"
              onClick={capture}
              aria-label="Take photo"
              className="flex size-18 items-center justify-center rounded-pill border-4 border-area transition-transform active:scale-95"
            >
              <span className="size-14 rounded-pill bg-white" />
            </button>
            <span className="text-micro text-on-ink-muted">Photograph your drawing, poem or craft</span>
          </>
        )}
        {phase === "preview" && (
          <>
            {error && (
              <p className="text-center text-caption text-area" role="alert">
                {error}
              </p>
            )}
            <div className="flex w-full gap-2">
              <Button variant="secondary" size="lg" className="flex-1 border-white text-white hover:bg-white/10" onClick={retake}>
                Retake
              </Button>
              <Button size="lg" variant="area" className="flex-[1.4]" onClick={addToGallery}>
                Add to gallery
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Fallback: the phone's own camera / picker */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => fromFile(e.target.files?.[0])}
      />
    </MobileScreen>
  );
}

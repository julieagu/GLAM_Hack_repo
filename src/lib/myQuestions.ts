import { useState } from "react";

// Questions someone asked in «Artwork Q&A» that aren't answered yet.
// Prototype only: kept in this browser (localStorage), oldest first.
// TODO: send to the Artothek backend; show the team's answer when there is one.

const KEY = "artothek:my-questions";

export interface MyQuestion {
  id: string;
  question: string;
  askedAt: string;
}

function load(): MyQuestion[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as MyQuestion[];
  } catch {
    return [];
  }
}

export function useMyQuestions() {
  const [questions, setQuestions] = useState<MyQuestion[]>(load);

  function ask(text: string) {
    const q: MyQuestion = { id: `q-${Date.now()}`, question: text.trim(), askedAt: new Date().toISOString() };
    const next = [...questions, q];
    setQuestions(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable: still shown until the page is left */
    }
  }

  return { questions, ask };
}

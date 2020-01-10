import * as React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import { NextPage } from "next";

const initialItems: Item[] = [
  { id: 1, text: "blah" },
  { id: 2, text: "gdfg" },
  { id: 3, text: "sdfgs" },
  { id: 4, text: "hello there" }
];

const IndexPage: NextPage = () => {
  const [state, dispatch] = React.useReducer(reducer, initialItems);
  const send = dispatchMiddleware(dispatch);

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>

      <div>
        {state.map(item => {
          return (
            <div key={item.id}>
              {item.text}
              <button
                onClick={() =>
                  send({ type: "REMOVE", payload: { id: item.id } })
                }
              >
                Delete item
              </button>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

function reducer(state: Item[], action: Action): Item[] {
  switch (action.type) {
    case "ADD":
      return [...state, { id: action.payload.id, text: action.payload.text }];

    case "REMOVE": {
      const newState = [...state];
      return newState.filter(item => item.id !== action.payload.id);
    }

    default:
      return state;
  }
}

type Action =
  | {
      type: "ADD";
      payload: Item;
    }
  | { type: "REMOVE"; payload: { id: number } };

interface Item {
  id: number;
  text: string;
}

function dispatchMiddleware(dispatch: React.Dispatch<Action>) {
  return (action: Action) => {
    switch (action.type) {
      case "ADD":
        console.log("adding", action.payload);
        dispatch(action);
        break;

      case "REMOVE":
        console.log("removing", action.payload);
        dispatch(action);
        break;

      default:
        break;
    }
  };
}

export default IndexPage;

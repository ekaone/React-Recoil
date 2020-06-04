import React from "react";
import { selector, atom, useRecoilState, useRecoilValue } from "recoil";

export default function CharacterCounter() {
  return (
    <div>
      <TextInput />
      <CharacterCount />
    </div>
  );
}

const textState = atom({
  // unique ID (with respect to other atoms/selectors)
  key: "textState",
  // default value (aka initial value)
  default: ""
});

function TextInput() {
  const [text, setText] = useRecoilState(textState);

  const onChange = event => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}

const charCountState = selector({
  // unique ID (with respect to other atoms/selectors)
  key: "charCountState",
  get: ({ get }) => {
    const text = get(textState);

    return text.length;
  }
});

function CharacterCount() {
  const count = useRecoilValue(charCountState);

  return <>Character Count: {count}</>;
}

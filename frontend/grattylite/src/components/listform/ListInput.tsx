interface ListInputProps {
  addItemFunction: Function;
}

function onAddItem(addFunc: Function) {
  const element: HTMLElement | null = document.getElementById("item-add-text");
  if (!(element instanceof HTMLInputElement)) return;
  const value: string = element.value;
  addFunc(value);
  element.value = "";
  return;
}
export default function ListInput({ addItemFunction }: ListInputProps) {
  return (
    <div className="join">
      <input className="input-bordered join-item" id="item-add-text"></input>
      <button
        className="btn join-item"
        onClick={() => {
          onAddItem(addItemFunction);
        }}
      >
        add
      </button>
    </div>
  );
}

import ListItem from "./ListItem";
import { DeleteButton } from "./DeleteButton";
interface ListItemsProps {
  items: string[];
  deleteCallback: Function;
}
export default function ListItems({ items, deleteCallback }: ListItemsProps) {
  return (
    <ul>
      {items.map((value: string, idx: number) => {
        return (
          <div className="join" key={idx + value}>
            <ListItem text={value} />
            <DeleteButton deleteKey={value} onClick={deleteCallback} />
          </div>
        );
      })}
    </ul>
  );
}

import ListItem from "./ListItem";
interface ListItemsProps {
  items: string[];
  deleteCallback: Function;
}
export default function ListItems({ items, deleteCallback }: ListItemsProps) {
  return (
    <ul className="grid grid-cols-1 gap-2">
      {items.map((value: string, idx: number) => {
        return (
          <ListItem
            text={value}
            deleteCallback={deleteCallback}
            key={idx + value}
          />
        );
      })}
    </ul>
  );
}

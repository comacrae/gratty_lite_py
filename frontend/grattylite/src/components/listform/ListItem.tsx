interface ListItemProps {
  text: string;
}
export default function ListItem({ text }: ListItemProps) {
  return <li className="join-item">{text}</li>;
}

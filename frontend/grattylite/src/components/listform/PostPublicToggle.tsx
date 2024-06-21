interface PostPublicToggleProps {
  onClickFunction: Function;
}
export default function PostPublicToggle({
  onClickFunction,
}: PostPublicToggleProps) {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text px-2">Allow Public Access</span>
        <input
          type="checkbox"
          className="toggle toggle-info"
          id="post-type-switch"
          onClick={(e) => {
            onClickFunction(e.currentTarget.checked);
          }}
        />
      </label>
    </div>
  );
}

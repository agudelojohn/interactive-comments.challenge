interface IReplayButton {
  className?: string;
}
const ReplyButton: React.FC<IReplayButton> = ({ className }) => {
  return (
    <div className={className}>
      <h1>ReplyButton</h1>
    </div>
  );
};

export default ReplyButton;

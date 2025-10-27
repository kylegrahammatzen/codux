type AppHeaderProps = {
  children: React.ReactNode;
};

export const AppHeader = (props: AppHeaderProps) => {
  return (
    <header className="flex items-center justify-between">
      {props.children}
    </header>
  );
};

type HomeGreetingProps = {
  firstName?: string;
};

export const HomeGreeting = (props: HomeGreetingProps) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const greeting = props.firstName ? `${getGreeting()}, ${props.firstName}!` : `${getGreeting()}!`;

  return (
    <div className="py-6 shrink-0">
      <h1 className="text-2xl font-semibold text-foreground">{greeting}</h1>
      <p className="text-xl font-semibold text-muted-foreground/70">Ready to assign your task?</p>
    </div>
  );
};

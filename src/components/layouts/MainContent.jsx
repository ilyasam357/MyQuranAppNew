
import CardDark from "../template/TemplateDarkMode";

function MainContent(props) {
  const { children } = props;
  return (
    <>
      <CardDark>
        <section className="h-full pb-3 dark:bg-slate-700">{children}</section>
      </CardDark>
    </>
  );
}

export default MainContent;

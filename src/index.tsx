import ReactDOM from "react-dom/client";
import { drawerEvent } from "@/module/drawer/utils/drawerEvent";
import { PopupContainer } from "@/PopupContainer";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const Test1 = () => {
  return <div style={{ background: "white", padding: "20px" }}>закрыть предыдущию</div>;
};

const Test = (props) => {
  console.log(props);
  return (
    <div onClick={() => drawerEvent.open(<Test1 />, { closePrevious: true, position: "left" })} style={{ background: "white", padding: "20px" }}>
      новая а
    </div>
  );
};

root.render(
  <div>
    <div
      onClick={() =>
        drawerEvent.open(
          <div onClick={() => drawerEvent.open(<Test />, { position: "top" })} style={{ background: "white", padding: "20px" }}>
            test
          </div>,
          { position: "bottom" },
        )
      }
    >
      click me
    </div>
    <PopupContainer />
  </div>,
);

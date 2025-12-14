import "./App.css";
import { HerouiProvider } from "./providers/heroui";
import { RouterProvider } from "react-router-dom";
import { router } from "./providers/router/ui/RouterProvider";
import { Provider } from "react-redux";
import { store } from "./providers/store";

export function App() {
    return (
        <Provider store={store}>
            <HerouiProvider>
                <RouterProvider router={router} />
            </HerouiProvider>
        </Provider>
    );
}

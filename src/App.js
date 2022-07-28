import React from 'react';
import { Provider } from "react-redux";
import { RootNavigatorContainer } from "./redux/modules/navigator/rootNavigator";
import store from "./redux/store";


const App = (props) => {


    return (
        <Provider store={store}>
            <RootNavigatorContainer />
        </Provider>
    );
};

export default App;

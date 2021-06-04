import {Route, Router, Switch} from 'react-router-dom';
import Body from '../views/Body';

function Routers(){
    return(
        <Switch>
            <Route path={`/`} exact component={Body} />
        </Switch>
    );
}

export default Routers;

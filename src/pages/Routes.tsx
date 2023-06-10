import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import NewContact from './NewContact'
import EditContact from './EditContact'

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/new" component={NewContact} />
      <Route path="/edit/:id" component={EditContact} />
    </Switch>
  )
}

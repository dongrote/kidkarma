import React from 'react';
import { Icon, Image, Statistic} from 'semantic-ui-react';

export default props => (
  <Statistic size='huge' color={props.karma < 0 ? 'red' : undefined}>
    <Statistic.Value>{props.loading ? <Icon size='huge' name='spinner' loading /> : props.karma}</Statistic.Value>
    <Statistic.Label>
      <Image src='https://www.kineticcu.com/sites/www.kineticcu.com/files/checking_piggy_bank.png'  />
    </Statistic.Label>
  </Statistic>

);

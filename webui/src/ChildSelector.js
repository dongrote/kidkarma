import React from 'react';
import { Form, Select } from 'semantic-ui-react';

export default props => (
  <Form>
    <Form.Field>
      <label>Select a Child</label>
      <Select
        fluid
        placeholder='Select child'
        options={props.kids.map((k, i) => ({
          key: i,
          value: k,
          text: k.username,
        }))}
        onChange={(e, d) => props.onSelect(d.value)}
        value={props.selectedChild}
      />
    </Form.Field>
  </Form>
);

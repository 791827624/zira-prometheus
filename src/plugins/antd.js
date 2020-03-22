import Vue from 'vue';
import { Menu, Icon, Card, Steps, Form, Input, Button, Tag, Table, Drawer, List, Spin } from 'ant-design-vue';

const Item = Form.Item;
const ListItem = List.Item;
Vue.prototype.$form = Form;
Vue.use(Menu).use(Icon).use(Card).use(Steps)
    .use(Form).use(Item).use(Input).use(Button)
    .use(Tag).use(Table).use(Drawer).use(List).use(ListItem)
    .use(Spin);
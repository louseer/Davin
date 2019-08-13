import Vue from 'vue'
// import ElementUI from 'element-ui';
// Vue.use(ElementUI);
import { 
  Button,
  Tree,
  Switch,
  Form,
  FormItem,
  Upload,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  Select,
  Option,
  OptionGroup,
  Slider,
  ColorPicker,
  Alert,
  Collapse,
  CollapseItem,
  MessageBox,
  Message,
  Dialog
} from 'element-ui'

Vue.use(Button)
Vue.use(Tree)
Vue.use(Switch)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Upload)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Slider)
Vue.use(ColorPicker)
Vue.use(Alert)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Dialog)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$message = Message


// 1.直接返回一个渲染函数
// export default function () {
//   return <div>test-jsx渲染的内容</div>;
// }
// 2.使用defineComponent
// template里.value 会自动解包；但是jsx里必须写.value
// v-show 是支持的；v-if 不支持，但是可以用三元表达式来替代v-if
// map 代替 v-for 循环组件
// {} 代替 v-bind
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    name: String
  },
  emits: ["on-click"],
  setup(props) {
    const show = ref(true);
    const data = [
      {
        name: "李四"
      },
      {
        name: "张三"
      }
    ];
    return () => (
      <>
        <div>{show.value ? <div>true</div> : <div>false</div>}</div>
        <div v-show={show.value}>test-jsx渲染的内容</div>
        {data.map(v => {
          return <div name={v.name}>{v.name}</div>;
        })}
        <hr />
        <div>父传子：{props.name}</div>
      </>
    );
  }
});

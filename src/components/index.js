import ComTable from './ComTable.vue'
import PersonDetail from './PersonDetail.vue'
import MyTable from './my-table.vue'
import AuditDialog from './AuditDialog.vue'
export default {
  install(app) {
    app.component('ComTable', ComTable)
    app.component('PersonDetail', PersonDetail)
    app.component('MyTable', MyTable)
    app.component('AuditDialog', AuditDialog)
  }
}

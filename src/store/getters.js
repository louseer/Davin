const getters = {
  userInfo: state => state.user.userInfo,
  navList: state => state.pagemap.navList,
  menuTree: state => state.pagemap.menuTree,
  selected: state => state.pagemap.selected,
  routerList: state => state.pagemap.routers,
  dialogdata: state => state.dialog.dialog,
  dialogdisplay: state => state.dialog.isShow,
  pageClose: state => state.pagemap.showClose,
  loading: state => state.pages.isShowLoading
}
export default getters

<template>
  <div>
    <Dtree :data="treenode" :renderContent="renderContent" style="margin-top:0.1rem" />
  </div>
</template>

<script>
import Dtree from '../../components/edit-tree.vue'
import { deflate } from 'zlib'
export default {
  components: {
    Dtree
  },
  props: {
    listType: {
      type: String,
      deflate: 'thumbnail'
    },
    treenode: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    treeNodeClick(nodeId) {
      this.$emit('treeNodeClick', nodeId)
    },
    unhideNode(nodeId) {
      this.$emit('unhideNode', nodeId)
    },
    unlockNode(nodeId) {
      this.$emit('unlockNode', nodeId)
    },
    renderContent(h, { node, data, store }) {
      if (this.listType === 'thumbnail') {
        if (data.type === 'element') {
          return h(
            'span',
            {
              style: {
                display: 'inline-block',
                width: '100%',
                height: '100%',
                position: 'relative'
              },
              on: {
                click: () => {
                  this.treeNodeClick(data.id)
                }
              }
            },
            [
              h('thumbnail', {
                props: {
                  nodeEltype: data.elType
                },
                style: {
                  margin: '0.06rem 0.1rem 0 0',
                  float: 'left'
                }
              }),
              h(
                'span',
                {
                  style: {
                    float: 'left',
                    color: data.active ? '#f60606' : '',
                    fontSize: '0.12rem',
                    lineHeight: '0.36rem',
                    width: '50%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }
                },

                data.name
              ),
              h(
                'div',
                {
                  style: {
                    position: 'absolute',
                    right: '0',
                    width: '0.5rem',

                    height: '0.36rem',
                    color: data.active ? '#f60606' : '',
                    fontSize: '0.12rem',
                    lineHeight: '0.36rem'
                  }
                },
                [
                  h('i', {
                    class: data.hide
                      ? ['iconfont', 'icon-ico_db_visiable']
                      : [],
                    style: {
                      float: 'left',
                      fontSize: '0.16rem',
                      lineHeight: '0.36rem',
                      background: '#313438'
                    },
                    on: {
                      click: () => {
                        console.log('中华显影王', '')
                        this.unhideNode(data.id)
                      }
                    }
                  }),
                  h('i', {
                    class: data.disable ? ['iconfont', 'icon-ico_db_lock'] : [],
                    style: {
                      float: 'left',
                      fontSize: '0.16rem',
                      lineHeight: '0.36rem',
                      background: '#313438'
                    },
                    on: {
                      click: () => {
                        console.log('中华解锁王', '')
                        this.unlockNode(data.id)
                      }
                    }
                  })
                ]
              )
            ]
          )
        }

        if (data.type === 'group') {
          return h(
            'div',
            {
              style: {
                overflow: 'hidden',
                float: 'left'
              },
              on: {
                click: () => {
                  this.treeNodeClick(data.id)
                }
              }
            },

            [
              h('i', {
                class: node.expanded
                  ? ['icon-ico_db_laytreef_open ', 'iconfont']
                  : ['icon-ico_db_laytreef_close ', 'iconfont'],
                style: {
                  display: 'inline-block',
                  float: 'left',
                  margin: '0.08rem',
                  fontSize: '0.2rem',
                  color: '#d4e1ee'
                }
              }),
              h(
                'span',
                {
                  style: {
                    display: 'inline-block',
                    float: 'left',

                    fontSize: '0.12rem',
                    lineHeight: '0.36rem',
                    color: data.active ? '#f60606' : '#d4e1ee'
                  }
                },
                data.name
              ),
              h(
                'div',
                {
                  style: {
                    position: 'absolute',
                    right: '0',
                    width: '0.5rem',

                    height: '0.36rem',
                    color: data.active ? '#f60606' : '',
                    fontSize: '0.12rem',
                    lineHeight: '0.36rem'
                  }
                },
                [
                  h('i', {
                    class: data.hide
                      ? ['iconfont', 'icon-ico_db_visiable']
                      : [],
                    style: {
                      float: 'left',
                      fontSize: '0.16rem',
                      lineHeight: '0.36rem',
                      background: '#313438'
                    },
                    on: {
                      click: () => {
                        console.log('中华显影王', '')
                        this.unhideNode(data.id)
                      }
                    }
                  }),
                  h('i', {
                    class: data.disable ? ['iconfont', 'icon-ico_db_lock'] : [],
                    style: {
                      float: 'left',
                      fontSize: '0.16rem',
                      lineHeight: '0.36rem',
                      background: '#313438'
                    },
                    on: {
                      click: () => {
                        console.log('中华解锁王', '')
                        this.unlockNode(data.id)
                      }
                    }
                  })
                ]
              )
            ]
          )
        }
      } else {
        if (data.type === 'element') {
          return h(
            'span',
            {
              style: {
                display: 'inline-block',
                width: '100%',
                height: '0.3rem',
                position: 'relative'
              },
              on: {
                click: () => {
                  this.treeNodeClick(data.id)
                }
              }
            },
            [
              h(
                'span',
                {
                  class: ['iconfont',`icon-ico_db_laycom_${data.elType}`],
                  style: {
                    float: 'left',
                    marginRight:'0.08rem',
                    fontSize: '0.16rem',
                    lineHeight: '0.3rem',
                    color: data.active ? '#f60606' : ''
                  }
                },
               
              ),
              h(
                'span',
                {
                  style: {
                    float: 'left',
                    color: data.active ? '#f60606' : '',
                    fontSize: '0.12rem',
                    lineHeight: '0.3rem',
                    width: '50%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }
                },

                data.name
              ),
              h(
                'div',
                {
                  style: {
                    position: 'absolute',
                    right: '0',
                    width: '0.5rem',

                    height: '0.3rem',
                    color: data.active ? '#f60606' : '',
                    fontSize: '0.12rem',
                    lineHeight: '0.3rem'
                  }
                },
                [
                  h('i', {
                    class: data.hide
                      ? ['iconfont', 'icon-ico_db_visiable']
                      : [],
                    style: {
                      float: 'left',
                      fontSize: '0.16rem',
                      lineHeight: '0.3rem',
                      background: '#313438'
                    },
                    on: {
                      click: () => {
                        console.log('中华显影王', '')
                        this.unhideNode(data.id)
                      }
                    }
                  }),
                  h('i', {
                    class: data.disable ? ['iconfont', 'icon-ico_db_lock'] : [],
                    style: {
                      float: 'left',
                      fontSize: '0.16rem',
                      lineHeight: '0.3rem',
                      background: '#313438'
                    },
                    on: {
                      click: () => {
                        console.log('中华解锁王', '')
                        this.unlockNode(data.id)
                      }
                    }
                  })
                ]
              )
            ]
          )
        }

        if (data.type === 'group') {
          return h(
            'div',
            {
              style: {
                overflow: 'hidden',
                float: 'left'
              },
              on: {
                click: () => {
                  this.treeNodeClick(data.id)
                }
              }
            },

            [
              h('i', {
                class: node.expanded
                  ? ['icon-ico_db_laytreef_open ', 'iconfont']
                  : ['icon-ico_db_laytreef_close ', 'iconfont'],
                style: {
                  display: 'inline-block',
                  float: 'left',
                  margin: '0.08rem',
                  fontSize: '0.2rem',
                  color: '#d4e1ee'
                }
              }),
              h(
                'span',
                {
                  style: {
                    display: 'inline-block',
                    float: 'left',

                    fontSize: '0.12rem',
                    lineHeight: '0.3rem',
                    color: data.active ? '#f60606' : '#d4e1ee'
                  }
                },
                data.name
              ),
              h(
                'div',
                {
                  style: {
                    position: 'absolute',
                    right: '0',
                    width: '0.5rem',

                    height: '0.3rem',
                    color: data.active ? '#f60606' : '',
                    fontSize: '0.12rem',
                    lineHeight: '0.3rem'
                  }
                },
                [
                  h('i', {
                    class: data.hide
                      ? ['iconfont', 'icon-ico_db_visiable']
                      : [],
                    style: {
                      float: 'left',
                      fontSize: '0.16rem',
                      lineHeight: '0.3rem',
                      background: '#313438'
                    },
                    on: {
                      click: () => {
                        console.log('中华显影王', '')
                        this.unhideNode(data.id)
                      }
                    }
                  }),
                  h('i', {
                    class: data.disable ? ['iconfont', 'icon-ico_db_lock'] : [],
                    style: {
                      float: 'left',
                      fontSize: '0.16rem',
                      lineHeight: '0.3rem',
                      background: '#313438'
                    },
                    on: {
                      click: () => {
                        console.log('中华解锁王', '')
                        this.unlockNode(data.id)
                      }
                    }
                  })
                ]
              )
            ]
          )
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
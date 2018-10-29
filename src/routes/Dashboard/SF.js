import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Card, List, Tag, Col, Button, Icon, message, Avatar, Divider } from 'antd';
import AddInstanceModal from '../../components/AddInstanceModal';
import AddSFModal from '../../components/AddSFModal';
import styles from './SF.less';

@connect(({ sf }) => ({
  sf,
}))
export default class SF extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      addSFVisible: false,
      addInstanceVisible: false,
      SFs: [],
      selectSF: {},
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'sf/getAllSFs',
    });
    this.timer = setInterval(() => this.tick(), 3000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sf) {
      this.state.SFs = nextProps.sf.SFs;
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick = () => {
    this.props.dispatch({
      type: 'sf/getAllSFs',
    });
  }

  showAddSFModal = () => {
    this.setState({
      addSFVisible: true,
    });
  }

  hideAddSFModal = () => {
    this.setState({
      addSFVisible: false,
    });
  }

  addSFOk = (values) => {
    this.props.dispatch({
      type: 'sf/addSF',
      payload: values,
      callback: this.handleRes,
    });
  }

  showAddInstanceModal = (item) => {
    this.setState({
      addInstanceVisible: true,
      selectSF: item,
    });
  }

  hideAddInstanceModal = () => {
    this.setState({
      addInstanceVisible: false,
    });
  }

  addInstanceOk = (values) => {
    console.log(values);
    this.props.dispatch({
      type: 'sf/addInstance',
      payload: values,
      callback: this.handleRes,
    });
    //   .then(() => {
    //     this.handleRefresh();
    //   });
  }

  handleRes = (res) => {
    if (res.status === 200) {
      message.success(res.msg);
      this.setState({
        addSFVisible: false,
        addInstanceVisible: false,
      });
    } else {
      message.error(res.msg);
    }
  }


  scaleDown = (item) => {
    if (item.num > 0) {
      this.props.dispatch({
        type: 'sf/scaleDown',
        payload: {
          '_id': item._id,
        },
        callback: this.handleRes,
      });
    } else {
      message.warning('no instance');
    }
  }

  autoScale = (item) => {
    this.props.dispatch({
      type: 'sf/updateSF',
      payload: {
        '_id': item._id,
        'autoscale': !item.autoscale,
      },
      callback: this.handleRes,
    });
  }

  deleteSF = (_id) => {
    this.props.dispatch({
      type: 'sf/deleteSF',
      _id,
    });
  }

  render() {
    const { SFs, addSFVisible, addInstanceVisible, selectSF } = this.state;
    return (
      <div>
        <Row>
          <Button
            type="dashed"
            style={{ width: '100%', marginBottom: 8, background: '#d9d9d9' }}
            icon="plus"
            onClick={() => this.showAddSFModal()}
          >
            注册网络服务
          </Button>
        </Row>
        <div className={styles.cardList}>
          <List
            rowKey="_id"
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={SFs}
            renderItem={item => (
              <List.Item key={item._id}>
                <Card
                  hoverable
                  className={styles.card}
                  actions={item.type === 'DaemonSet' ? [] : [<a onClick={(ev) => { this.showAddInstanceModal(item); }}><Icon type="plus" theme="outlined" />添加实例</a>,
                    <a onClick={(ev) => { this.scaleDown(item); }}><Icon type="minus" theme="outlined" />缩减实例</a>,
                    <a onClick={(ev) => { this.autoScale(item); }} ><Icon className={item.autoscale ? styles.green : styles.gray} type="eye" theme="filled" />自动伸缩</a>]}
                >
                  <Card.Meta
                    avatar={(
                      <div className={styles.divAvatar}>
                        <img alt="" className={styles.cardAvatar} src={item.pic} />
                      </div>
                    )}
                    title={<div><span className={styles.hostname}>{item._id}</span>{item.type === 'Pod' ? <Icon onClick={(ev) => { this.deleteSF(item._id); }} className={styles.icon} type="delete" /> : ''}</div>}
                    description={
                      <div>
                        <Row>
                          <Col span={12}>备注名： {item.remark}</Col>
                          <Col span={12}>镜像：{item.image}</Col>
                        </Row>
                        <Row>
                          <Col span={12}>cpu：{item.cpu}</Col>
                          <Col span={12}>内存：{item.memory}</Col>
                        </Row>
                        <Row>
                          <Col span={24}>负载均衡策略：{item.policy}</Col>
                        </Row>
                        <Row>
                          <Col span={24} style={{ height: 50 }}>功能描述：{item.description}</Col>
                        </Row>
                      </div>
                    }
                  />
                  <Divider orientation="left">实例: {item.num}</Divider>
                  <div style={{ height: 130, overflow: 'auto' }}>
                    <List
                      itemLayout="horizontal"
                      dataSource={item.instances}
                      locale={{ emptyText: '暂无实例' }}
                      renderItem={pod => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar src="/assets/static/pic/docker.jpg" />}
                            title={<div>{pod.ip} (cpu:{pod.cpu} | 内存:{pod.memory}) {pod.status === 'running' ? <Tag color="#87d068">{pod.status}</Tag> : <Icon type="loading" theme="outlined" />}</div>}
                            description={
                              <div>
                                收到数据包：{pod.receivedPackets} 队列剩余：{pod.qsize} 当前处理速度：{pod.speed}
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </div>
        {addInstanceVisible && <AddInstanceModal visible={addInstanceVisible} item={selectSF} onOk={this.addInstanceOk} onCancel={this.hideAddInstanceModal} />}
        {addSFVisible && <AddSFModal visible={addSFVisible} onOk={this.addSFOk} onCancel={this.hideAddSFModal} />}
      </div>
    );
  }
}

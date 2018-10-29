import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Card, List, Tag, Col, Button, Icon, message, Avatar, Divider } from 'antd';

import styles from './Workplace.less';

@connect(({ kubernetes }) => ({
  kubernetes,
}))
export default class SF extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'kubernetes/getNodes',
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.kubernetes) {
      this.state.nodes = nextProps.kubernetes.nodes;
    }
  }

  render() {
    const { nodes } = this.state;
    return (
      <div>
        <div className={styles.cardList}>
          <List
            rowKey="spec"
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={nodes}
            renderItem={item => (
              <List.Item key={item.spec.externalID}>
                <Card
                  hoverable
                  className={styles.card}
                  actions={item.type === 'DaemonSet' ? [] : [<a ><Icon type="redo" theme="outlined" />重启</a>,
                    <a ><Icon type="delete" theme="outlined" />移除</a>]}
                >
                  <Card.Meta
                    onClick={(ev) => { this.details(item._id); }}
                    avatar={(
                      <div className={styles.divAvatar}>
                        <img alt="" className={styles.cardAvatar} src="/assets/static/pic/computer.png" />
                        <div>{item.status.addresses[0].address}</div>
                        <div><Tag color={item.status.conditions[3].type === 'Ready' ? '#87d068' : '#faad14'}>{item.status.conditions[3].type}</Tag></div>
                      </div>
                    )}
                    title={<div><span className={styles.hostname}>{item.spec.externalID}</span></div>}
                    description={
                      <div>
                        <Row>
                          <Col span={24}>操作系統： {item.status.nodeInfo.osImage}</Col>
                        </Row>
                        <Row>
                          <Col span={24}>内核版本：{item.status.nodeInfo.kernelVersion}</Col>
                        </Row>
                        <Row>
                          <Col span={12}>docker版本：{item.status.nodeInfo.containerRuntimeVersion}</Col>
                          <Col span={12}>kubernetes版本：{item.status.nodeInfo.kubeletVersion}</Col>
                        </Row>
                        <Row>
                          <Col span={12}>cpu：{item.status.capacity.cpu}</Col>
                          <Col span={12}>内存：{item.status.capacity.memory}</Col>
                        </Row>
                      </div>
                    }
                  />
                </Card>
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}

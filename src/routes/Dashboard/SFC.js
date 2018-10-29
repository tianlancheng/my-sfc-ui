import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { List, Spin, Icon, Card, Tag, Button, message, Modal } from 'antd';
import CrossArea from '../../components/crossArea';
import InsertSFModal from '../../components/InsertSFModal';
import RemoveSFModal from '../../components/RemoveSFModal';
import styles from './SFC.less';

@connect(({ sfc, loading }) => ({
  sfc,
  loading,
}))
export default class Monitor extends PureComponent {
  state = {
    insertSFVisible: false,
    removeSFVisible: false,
    sfcId: 0,
    sfcLen: 0,
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'sfc/getSFCs',
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sfc) {
      this.state.SFCs = nextProps.sfc.SFCs;
    }
  }

  addSFC = () => {
    this.props.dispatch(routerRedux.push('/dashboard/addSFC'));
  }

  showInsertSFModal = (item) => {
    this.setState({
      insertSFVisible: true,
      sfcId: item._id,
      sfcLen: item.sfs.length,
    });
  }

  hideInsertSFModal = () => {
    this.setState({
      insertSFVisible: false,
    });
  }

  insertSFOk = (values) => {
    this.props.dispatch({
      type: 'sfc/insertSF',
      payload: values,
      callback: this.handleRes,
    });
  }

  showRemoveSFModal = (item) => {
    this.setState({
      removeSFVisible: true,
      sfcId: item._id,
      sfcLen: item.sfs.length,
    });
  }

  hideRemoveSFModal = () => {
    this.setState({
      removeSFVisible: false,
    });
  }

  removeSFOk = (values) => {
    this.props.dispatch({
      type: 'sfc/removeSF',
      payload: values,
      callback: this.handleRes,
    });
  }

  handleRes = (res) => {
    if (res.status === 200) {
      message.success(res.msg);
      this.setState({
        insertSFVisible: false,
        removeSFVisible: false,
      });
    } else {
      message.error(res.msg);
    }
  }

  deleteSFC = (_id) => {
    const that = this;
    Modal.confirm({
      title: '确定删除服务链?',
      onOk() {
        that.props.dispatch({
          type: 'sfc/deleteSFC',
          _id,
        });
      },
      onCancel() {},
    });
  }


  render() {
    const { SFCs, sfcId, sfcLen, insertSFVisible, removeSFVisible } = this.state;
    const { loading } = this.props;
    const addLoading = loading.effects['sfc/insertSF'];
    const removeLoading = loading.effects['sfc/removeSF'];
    return (
      !SFCs ? <div style={{ textAlign: 'center' }}><Spin /></div> : (
        <div>
          <Button
            type="dashed"
            style={{ width: '100%', marginBottom: 8, background: '#d9d9d9' }}
            icon="plus"
            onClick={this.addSFC}
          >
            新增服务链
          </Button>
          <List
            rowKey="name"
            grid={{ gutter: 24, lg: 1, md: 1, sm: 1, xs: 1 }}
            dataSource={SFCs}
            loading={loading.effects['sfc/getSFCs']}
            renderItem={item => (
              <List.Item key={item.name}>
                <Card
                  title={`${item._id} ${item.name}`}
                  className={styles.line}
                  extra={(
                    <div>
                      <Icon onClick={(ev) => { this.showInsertSFModal(item); }} className={styles.icon} type="plus" theme="outlined" />
                      <Icon onClick={(ev) => { this.showRemoveSFModal(item); }} className={styles.icon} type="minus" theme="outlined" />
                      <Icon onClick={(ev) => { this.deleteSFC(item._id); }} className={styles.close} type="close" theme="outlined" />
                    </div>)}
                >
                  { item.sfs.map((sf, index) => {
                    return (
                      <div key={sf._id} className={styles.item}>
                        {index === 0 ? <Icon type="arrow-right" theme="outlined" className={styles.arrow} /> : ''}
                        <div className={styles.sf}>
                          <div className={styles.pic}>
                            <span>{}</span>
                            <img alt="" src={sf.pic} />
                          </div>
                          <div>{sf._id}</div>
                        </div>
                        <Icon type="arrow-right" theme="outlined" className={styles.arrow} />
                      </div>
                    );
                  })}
                </Card>
              </List.Item>
            )}
          />
          {insertSFVisible &&
            <InsertSFModal
              visible={insertSFVisible}
              loading={addLoading}
              sfcId={sfcId}
              len={sfcLen}
              onOk={this.insertSFOk}
              onCancel={this.hideInsertSFModal}
            />}
          {removeSFVisible &&
            <RemoveSFModal
              visible={removeSFVisible}
              loading={removeLoading}
              sfcId={sfcId}
              len={sfcLen}
              onOk={this.removeSFOk}
              onCancel={this.hideRemoveSFModal}
            />}
        </div>
      )
    );
  }
}

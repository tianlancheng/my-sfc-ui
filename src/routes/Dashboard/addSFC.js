import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Col, Icon, Card, Form, Button, Input, Spin, message } from 'antd';

import { DraggableAreasGroup } from 'react-draggable-tags';
import styles from './addSFC.less';

const group = new DraggableAreasGroup();
const DraggableArea1 = group.addArea();
const DraggableArea2 = group.addArea();
const FormItem = Form.Item;

@Form.create()
@connect(({ sf, sfc }) => ({
  sf,
  sfc,
}))
export default class CrossArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SFs: null,
      selectSFs: null,
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'sf/getSFs',
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sf) {
      this.state.SFs = nextProps.sf.SFs;
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'sfc/addSFC',
          payload: {
            name: values.name,
            SFs: this.state.selectSFs,
          },
          callback: this.handleRes,
        });
      } else {
        console.log(err);
      }
    });
  }

  handleRes = (res) => {
    if (res.status === 200) {
      message.success(res.msg);
      this.props.dispatch(routerRedux.push('/dashboard/SFC'));
    } else {
      message.error(res.msg);
    }
  }

  handleChange = (tags) => {
    this.state.selectSFs = tags;
  }

  render() {
    const { SFs, selectSFs } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      !SFs || SFs.length < 1 ? <div style={{ textAlign: 'center' }}><Spin /></div> : (
        <div>
          <div className={styles.CrossArea}>
            <Col span={4}>
              <DraggableArea1
                className={`${styles.left}`}
                initialTags={SFs}
                render={({ tag }) => (
                  <div className={styles.tag}>
                    {tag._id}
                  </div>
                )}
              />
            </Col>
            <Col span={20}>
              <Card title="创建网络功能服务链">
                <DraggableArea2
                  className={`${styles.right}`}
                  initialTags={selectSFs}
                  render={({ tag }) => (
                    <div>
                      <div className={styles.tag}>
                        {tag._id}
                      </div>
                      <Icon type="arrow-right" theme="outlined" className={styles.arrow} />
                    </div>
                  )}
                  onChange={this.handleChange}
                />
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <FormItem label="sfc名称" style={{ top: 10, width: 400 }}>
                    {getFieldDecorator('name', {
                      rules: [{ required: true, message: 'Please input sfc name!' }],
                    })(
                      <Input placeholder="sfc name" />
                    )}
                  </FormItem>
                  <FormItem>
                    <Button type="primary" htmlType="submit">提交</Button>
                  </FormItem>
                </Form>
              </Card>
            </Col>
          </div>
        </div>
      )
    );
  }
}

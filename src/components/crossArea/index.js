import React, { Component } from 'react';
import { connect } from 'dva';
import { Col, Icon, Card, Form, Button, Input, Spin } from 'antd';

import { DraggableAreasGroup } from 'react-draggable-tags';
import deleteBtn from '../../assets/delete.png';
import deleteBtn2x from '../../assets/delete@2x.png';
import styles from './style.less';
import mock from './mock.js';

const group = new DraggableAreasGroup();
const DraggableArea1 = group.addArea();
const DraggableArea2 = group.addArea();
const FormItem = Form.Item;

@Form.create()
@connect(({ sf }) => ({
  sf,
}))
export default class CrossArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SFs: null,
      SelectSFs: null,
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
        console.log('Received values of form: ', values);
      }
    });
  }

  handleChange = (tags) => {
    console.log(tags);
  }

  render() {
    const { SFs, SelectSFs } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      !SFs ? <div style={{ textAlign: 'center' }}><Spin /></div> : (
        <div>
          <div className={styles.CrossArea}>
            <Col span={4}>
              <DraggableArea1
                className={`${styles.left}`}
                initialTags={SFs}
                render={({ tag }) => (
                  <div className={styles.tag}>
                    {tag.name}
                  </div>
                )}
              />
            </Col>
            <Col span={20}>
              <Card title="创建网络功能服务链">
                <DraggableArea2
                  className={`${styles.right}`}
                  initialTags={SelectSFs}
                  render={({ tag }) => (
                    <div>
                      <div className={styles.tag}>
                        {tag.name}
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

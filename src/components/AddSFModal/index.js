import React, { Component } from 'react';
import { Form, Input, Modal, Radio } from 'antd';
import styles from './index.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class AddSFModal extends Component {
  hideModelHandler = () => {
    const { onCancel } = this.props;
    onCancel();
  };

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
      }
    });
  };

  render() {
    const { visible } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Modal
        title="注册网络服务"
        visible={visible}
        onOk={this.okHandler}
        onCancel={this.hideModelHandler}
      >
        <Form layout="horizontal">
          <FormItem label="id" {...formItemLayout}>
            {getFieldDecorator('_id', {
              rules: [{ required: true }],
            })(<Input placeholder="如：firewall" />)}
          </FormItem>
          <FormItem label="备注名" {...formItemLayout}>
            {getFieldDecorator('remark', {
              rules: [{ required: false }],
            })(<Input placeholder="如：防火墙" />)}
          </FormItem>
          <FormItem label="镜像" hasFeedback {...formItemLayout}>
            {getFieldDecorator('image', {
              rules: [{ required: true }],
            })(<Input placeholder="如：ubuntu:16" />)}
          </FormItem>
          <FormItem label="默认cpu配额" hasFeedback {...formItemLayout}>
            {getFieldDecorator('cpu', {
              rules: [{ required: true }],
            })(<Input placeholder="如：0.1" />)}
          </FormItem>
          <FormItem label="默认内存配额" hasFeedback {...formItemLayout}>
            {getFieldDecorator('memory', {
              rules: [{ required: true }],
            })(<Input placeholder="如：64Mbi" />)}
          </FormItem>
          <FormItem label="负载均衡策略" {...formItemLayout}>
            {getFieldDecorator('policy', {
              initialValue: 'RoundRobin',
              rules: [{ required: true }],
            })(<RadioGroup><Radio value="RoundRobin">轮询</Radio><Radio value="TaskAware">任务感知</Radio></RadioGroup>)}
          </FormItem>
          <FormItem label="自动伸缩" {...formItemLayout}>
            {getFieldDecorator('autoscale', {
              initialValue: false,
              rules: [{ required: true, type: 'boolean' }],
            })(<RadioGroup><Radio value>true</Radio><Radio value={false}>false</Radio></RadioGroup>)}
          </FormItem>
          <FormItem label="功能描述" {...formItemLayout}>
            {getFieldDecorator('description', {
              rules: [{ required: false }],
            })(<Input placeholder="" />)}
          </FormItem>
          <FormItem label="图片" {...formItemLayout}>
            {getFieldDecorator('pic', {
              initialValue: '/assets/static/pic/tpIcon_4.png',
              rules: [{ required: true }],
            })(
              <RadioGroup className={styles.radio}>
                <Radio value="/assets/static/pic/tpIcon_4.png"><img alt="" src="/assets/static/pic/tpIcon_4.png" /></Radio>
                <Radio value="/assets/static/pic/f5.png"><img alt="" src="/assets/static/pic/f5.png" /></Radio>
                <Radio value="/assets/static/pic/py_VR.png"><img alt="" style={{ height: 30 }} src="/assets/static/pic/py_VR.png" /></Radio>
                <Radio value="/assets/static/pic/tpicon_8.png"><img alt="" src="/assets/static/pic/tpicon_8.png" /></Radio>
                <Radio value="/assets/static/pic/tpIcon_5.png"><img alt="" src="/assets/static/pic/tpIcon_5.png" /></Radio>
                <Radio value="/assets/static/pic/tpIcon_6.png"><img alt="" src="/assets/static/pic/tpIcon_6.png" /></Radio>
                <Radio value="/assets/static/pic/tpIcon_9.png"><img alt="" src="/assets/static/pic/tpIcon_9.png" /></Radio>
                <Radio value="/assets/static/pic/vr-selfdefined(2).png"><img alt="" style={{ height: 30 }} src="/assets/static/pic/vr-selfdefined(2).png" /></Radio>
              </RadioGroup>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddSFModal);

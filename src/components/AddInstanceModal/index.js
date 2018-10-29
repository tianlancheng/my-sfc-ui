import React, { Component } from 'react';
import { Form, Input, Modal, Radio } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class AddInstanceModal extends Component {
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
    const { item, visible } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Modal
        title="添加实例"
        visible={visible}
        onOk={this.okHandler}
        onCancel={this.hideModelHandler}
      >
        <Form layout="horizontal">
          <FormItem label="id" {...formItemLayout}>
            {getFieldDecorator('_id', {
              initialValue: item._id,
              rules: [{ required: true }],
            })(<Input placeholder="如：firewall" disabled />)}
          </FormItem>
          <FormItem label="镜像" hasFeedback {...formItemLayout}>
            {getFieldDecorator('image', {
              initialValue: item.image,
              rules: [{ required: true }],
            })(<Input placeholder="如：ubuntu:16" />)}
          </FormItem>
          <FormItem label="cpu配额" hasFeedback {...formItemLayout}>
            {getFieldDecorator('cpu', {
              initialValue: item.cpu,
              rules: [{ required: true }],
            })(<Input placeholder="如：0.1" />)}
          </FormItem>
          <FormItem label="内存配额" hasFeedback {...formItemLayout}>
            {getFieldDecorator('memory', {
              initialValue: item.memory,
              rules: [{ required: true }],
            })(<Input placeholder="如：64Mbi" />)}
          </FormItem>
          <FormItem label="负载均衡策略" {...formItemLayout}>
            {getFieldDecorator('policy', {
              initialValue: item.policy,
              rules: [{ required: true }],
            })(<RadioGroup><Radio value="RoundRobin">轮询</Radio><Radio value="TaskAware">任务感知</Radio></RadioGroup>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddInstanceModal);

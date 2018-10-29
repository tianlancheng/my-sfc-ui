import React, { Component } from 'react';
import { Form, Input, Modal, InputNumber } from 'antd';

const FormItem = Form.Item;
class InsertSFModal extends Component {
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
    const { visible, sfcId, len, loading } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
    };
    const max = len + 1;
    return (
      <Modal
        title="插入网络服务"
        confirmLoading={loading}
        visible={visible}
        onOk={this.okHandler}
        onCancel={this.hideModelHandler}
      >
        <Form layout="horizontal">
          <FormItem label="服务链id" {...formItemLayout}>
            {getFieldDecorator('sfcId', {
              initialValue: sfcId,
              rules: [{ required: true }],
            })(<Input placeholder="如：1" disabled />)}
          </FormItem>
          <FormItem label="服务id" {...formItemLayout}>
            {getFieldDecorator('sfId', {
              rules: [{ required: true }],
            })(<Input placeholder="如：firewall" />)}
          </FormItem>
          <FormItem label="插入位置(从1开始)" {...formItemLayout}>
            {getFieldDecorator('order', {
              initialValue: 1,
              rules: [{ required: true }],
            })(<InputNumber min={1} max={max} />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(InsertSFModal);

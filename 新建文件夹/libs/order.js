//工单接口
import request from 'netRequest.js';
import Qs from "qs";

//创建工单
export function createOrder(data) {
    var qsData = Qs.stringify(data);
    return request({
        url: process.env.VUE_APP_BASE_API + '/order/store/order/save',
        method: 'post',
        data: qsData
    });
}
 
//查询工单详情
export function queryOrderInfo(id) {
    return request({
        url: process.env.VUE_APP_BASE_API + `/order/store/order/infobypk/${id}`,
        method: 'get',
    });
}

//修改工单客户信息
export function modifyClient(data) {
    return request({
        url: process.env.VUE_APP_BASE_API + `/order/store/order/driver/update`,
        method: 'put',
        data
    });
}

//修改工单车辆信息
export function modifyVehicle(data) {
    return request({
        url: process.env.VUE_APP_BASE_API + `/order/store/order/driver/car/update`,
        method: 'put',
        data
    });
}

//修改工单配件信息
export function modifyFitting(data) {
    return request({
        url: process.env.VUE_APP_BASE_API + `/order/store/order/goods/update`,
        method: 'put',
        data
    });
}

//修改故障信息
export function modifyFault(data) {
    return request({
        url: process.env.VUE_APP_BASE_API + `/order/store/order/fault/update`,
        method: 'put',
        data
    });
}

//修改服务
export function modifyService(data) {

    return request({
        url: process.env.VUE_APP_BASE_API + `/order/store/order/service/update`,
        method: 'put',
        data
    });
}

//修改工单信息
export function modifyOrderInfo(data) {
    return request({
        url: process.env.VUE_APP_BASE_API + `/order/store/order/update`,
        method: 'put',
        data
    });
}

//门店查询司机列表-最新版本
export function newQueryClient(data) {
    var qsData = Qs.stringify(data);
    return request({
        url: process.env.VUE_APP_BASE_API + `/organization/driver/user/keyword/withPagingList`,
        method: 'post',
        data: qsData
    });
}

//门店统一保存配件、服务
export function uniteSaveOrder(data) {
    return request({
        url: process.env.VUE_APP_BASE_API + `/order/store/order/goods/unite/update`,
        method: 'put',
        data
    });
}
//收款
export function collectPrice(data) {
    return request({
        url: process.env.VUE_APP_BASE_API + `/order/store/order/collect/money/update`,
        method: 'put',
        data
    });
}
//取消工单
export function invalidOrder(data) {
    return request({
        url: process.env.VUE_APP_BASE_API + `/order/store/order/cancelled/update`,
        method: 'put',
        data
    });
}
// 门店接单
export function takeOrder(data) {
    return request({
        url: process.env.VUE_APP_BASE_API + `/order/store/order/accept/update`,
        method: 'put',
        data
    });
}
//查询工单列表
export function queryOrderList(data) {
    var qsData = Qs.stringify(data);
    return request({
        url: process.env.VUE_APP_BASE_API + `/order/store/order/withPagingList`,
        method: 'post',
        data: qsData
    })
}
//统一收款
export function unifiedCollection(data) {
    return request({
        url: process.env.VUE_APP_BASE_API + `/order/store/order/unified/collect/money/update`,
        method: 'put',
        data
    })
}
//门店获取工单统计
export function queryOrderSta(storeId) {
    return request({
        url: process.env.VUE_APP_BASE_API + `/order/store/order/total/${storeId}`,
        method: 'get',
    })
}

//删除取消工单
export function deleteOrder(data){
    return request({
        url: process.env.VUE_APP_BASE_API + '/order/store/order/delete',
        method: 'delete',
        data
    })
}

// import {
//     queryOrderInfo,
//     modifyClient,
//     modifyVehicle,
//     modifyFault,
//     uniteSaveOrder,
//     collectPrice,
//     invalidOrder
// } from '@/api/order'

const state = {
    orderId: "", //门店工单ID
    // 客户信息
    clientInfo: {
        avatar: "", //客户头像 
        person: "", //客户联系人
        phone: "", //客户联系电话
        id: "", //客户id
        name: "", //司机名称
    },
    // 车辆信息
    vehicleInfo: {
        number: "", //车牌号
        code: "", //车辆识别代码 
        models: "", //车型
        modelsName: "", //车型显示名称
        modelsNameTwo: "", //二级车型名称(车型图片)
        mileage: "", //里程
    },
    // 故障信息
    faultInfo: {
        description: "", //描述
        images: [] //故障图片
    },
    // 负责人
    principal: "",
    // 完成时间
    completeDate: "",
    /**
     * itemId 项目ID（门店商品ID）
     * itemName 项目名称（商品名称）
     * itemUnitPrice 项目单价
     * itemNumber 项目数量
     * itemCode 项目编码（配件编码）
     */
    // 配件列表
    fittingList: [],
    // 配件结算方式  1分开结算 2统一结算
    fittingType: 1,
    // 配件结算金额（统一结算使用）
    fittingAmount: 0,
    /**
     * itemId 项目ID（服务ID）
     * itemName 项目名称
     * itemUnitPrice 项目单价
     * itemNumber 项目数量
     * itemUnit 项目单位
     */
    // 服务列表 
    serviceList: [],
    // 服务结算方式  1分开结算 2统一结算
    serviceType: 1,
    // 服务结算金额
    serviceAmount: 0,
    //优惠金额
    discountAmount: 0,
    orderInfo: {
        createTime: "", //创建时间
        status: "", //订单状态
        statusName: "", //门店工单状态显示名称
        createPerson: "", //订单创建人
        code: "", //订单编号
        settlementStatusName: "", //订单子状态显示名称(结算状态)
        settlementDate: "", //结算时间
        settleDate: "", //结清时间
        handle: "", //订单已付金额
        total: "", //总金额
    },
    collectionRecords: [], //收款记录
}

const getters = {
    // 配件总计
    fittingTotal: state => {
        var amount = 0;
        if (state.fittingType == 1) {
            state.fittingList.map(item => {
                amount += item.itemUnitPrice * item.itemNumber
            })
        } else {
            amount += state.fittingAmount
        }
        return amount;
    },
    // 服务总计
    serviceTotal: state => {
        var amount = 0;
        if (state.serviceType == 1) {
            state.serviceList.map(item => {
                amount += item.itemUnitPrice * item.itemNumber
            })
        } else {
            amount += state.serviceAmount
        }
        return amount;
    },
    total: (state, getters) => {
        return getters.fittingTotal + getters.serviceTotal - state.discountAmount;
    },
    // 是否可编辑
    isEdit: state => {
        if (state.orderInfo.status == 1) {
            return true;
        } else {
            return false;
        }
    }
}

const mutations = {
    // 重置
    SET_RESET: (state) => {
        state.orderId = "";
        state.clientInfo = {
            avatar: "", //客户头像 
            person: "", //客户联系人
            phone: "", //客户联系电话
            id: "", //客户id
            name: "", //司机名称
        };
        state.vehicleInfo = {
            number: "", //车牌号
            code: "", //车辆识别代码 
            models: "", //车型
            modelsName: "", //车型显示名称
            modelsNameTwo: "", //二级车型名称(车型图片)
            mileage: "", //里程
        };
        state.faultInfo = {
            description: "", //描述
            images: [] //故障图片
        }
        state.principal = "";
        state.completeDate = "";
        state.fittingList = [];
        // 配件结算方式  1分开结算 2统一结算
        state.fittingType = 1;
        // 配件结算金额（统一结算使用）
        state.fittingAmount = 0;
        state.serviceList = [];
        // 服务结算方式  1分开结算 2统一结算
        state.serviceType = 1;
        // 服务结算金额
        state.serviceAmount = 0;
        //优惠金额
        state.discountAmount = 0;
        state.orderInfo = {
            createTime: "", //创建时间
            status: "", //订单状态
            statusName: "", //门店工单状态显示名称
            createPerson: "", //订单创建人
            code: "", //订单编号
            settlementStatusName: "", //订单子状态显示名称(结算状态)
            settlementDate: "", //结算时间
            settleDate: "", //结清时间
            handle: "", //订单已付金额
            total: "", //总金额
        };
        state.collectionRecords = []; //收款记录
    },
    // 设置订单id
    SET__ORDERID: (state, orderId) => {
        state.orderId = orderId;
    },
    // 设置客户
    SET__CLIENTINFO: (state, clientInfo) => {
        var {
            avatar,
            person,
            phone,
            id,
            name

        } = clientInfo;
        state.clientInfo = {
            avatar,
            person,
            phone,
            id,
            name

        };

    },
    // 设置车辆
    SET__VEHICLEINFO: (state, vehicleInfo) => {
        var {
            number,
            code,
            models,
            modelsName,
            modelsNameTwo,
            mileage
        } = vehicleInfo;
        state.vehicleInfo = {
            number,
            code,
            models,
            modelsName,
            modelsNameTwo,
            mileage
        };

        console.log("车辆信息", state.vehicleInfo);

    },
    // 设置故障图片
    SET_FAULTIMAGE: (state, images) => {
        if (typeof images === 'string') {
            // 上传单张故障图片
            state.faultInfo.images.push(images);
        } else {
            // 上传多张故障图片
            state.faultInfo.images.push(...images);
        }
        console.log("故障图片", state.faultInfo.images);

    },
    // 删除故障图片
    DEL_FAULTIMAGE: (state, index) => {
        state.faultInfo.images.splice(index, 1);
        console.log("故障图片", state.faultInfo.images);
    },
    // 设置故障描述
    SET_DESCRIPTION: (state, description) => {
        state.faultInfo.description = description;
    },
    // 设置工单完成时间
    SET_COMPLETEDATE: (state, completeDate) => {
        state.completeDate = completeDate
    },
    // 设置工单负责人
    SET_PRINCIPAL: (state, principal) => {
        state.principal = principal
    },
    // 设置配件列表
    SET_FITTINGLIST: (state, goods) => {
        if (goods instanceof Array) {
            // 
            if (goods.length) {
                state.fittingList.concat(goods);
            }

        } else {
            // 添加单个商品
            var status = state.fittingList.some(item => {
                return item.itemId === goods.itemId
            })
            if (status) {
                Toast('该商品已添加');
            } else {
                state.fittingList.push(goods);
                console.log("商品列表", state.fittingList);

            }
        }
        // new Object
    },
    // 设置配件结算方式
    SET_FITTINGTYPE: (state, type) => {
        state.fittingType = type;
        console.log("开关值", state.fittingType);
    },
    // 修改配件结算金额
    SET_FITTINGAMOUNT: (state, amount) => {
        state.fittingAmount = amount;
    },
    // 设置服务列表
    SET_SERVICELIST: (state, service) => {
        if (service instanceof Array) {
            // 
            if (service.length) {
                state.serviceList = service
            }

        } else {
            // 添加单个服务
            var status = state.serviceList.some(item => {
                return item.itemId === service.itemId
            })
            if (status) {
                Toast('该服务已添加');
            } else {
                state.serviceList.push(service);


            }
        }
        console.log("服务列表", state.serviceList);
    },
    // 设置服务结算方式
    SET_SERVICETYPE: (state, type) => {
        state.serviceType = type;
    },
    // 设置服务结算金额
    SET_SERVICEAMOUNT: (state, amount) => {
        state.serviceAmount = amount;
    },
    // 设置优惠金额
    SET_DISCOUNTAMOUNT: (state, amount) => {
        state.discountAmount = amount;
    },
    // 设置订单信息
    SET_ORDERINFO: (state, orderInfo) => {

        var {
            createTime,
            status,
            statusName,
            createPerson,
            code,
            settlementStatusName,
            settlementDate,
            settleDate,
            handle,
            total
        } = orderInfo;
        state.orderInfo = {
            createTime,
            status,
            statusName,
            createPerson,
            code,
            settlementStatusName,
            settlementDate,
            settleDate,
            handle,
            total
        }
    },
    // 设置收款记录
    SET_COLLECTIONRECORDS: (state, collectionRecords) => {
        state.collectionRecords = collectionRecords;
    }
}

const actions = {
    getOrderInfo({
        commit
    }, orderId) {
        return new Promise((resolve, reject) => {
            queryOrderInfo(orderId).then(res => {
                console.log("工单详情", res);
                if (res.kfbCode == 200) {
                    // commit("SET_RESET");
                    var {
                        datas
                    } = res;
                    commit("SET__ORDERID", datas.orderId); //设置工单id
                    /**
                     * 设置客户
                     */
                    var clientInfo = {
                        avatar: datas.driverAvatar, //客户头像 
                        person: datas.orderContactsPerson, //客户联系人
                        phone: datas.orderContactsPhone, //客户联系电话
                        id: datas.orderDriverUserId, //客户id
                        name: datas.orderDriverUserName, //司机名称
                    }
                    commit("SET__CLIENTINFO", clientInfo);
                    /**
                     * 设置车辆
                     */
                    var vehicleInfo = {
                        number: datas.orderDriverUserCarPlateNumber, //车牌号
                        code: datas.orderCarCode, //车辆识别代码 
                        models: datas.orderModelsId, //车型
                        modelsName: datas.orderModelsName, //车型显示名称
                        modelsNameTwo: datas.orderModelsNameTwo, //二级车型名称(车型图片)
                        mileage: datas.orderMileage, //里程
                    }
                    commit("SET__VEHICLEINFO", vehicleInfo);
                    /**
                     * 设置故障信息
                     */
                    var images = datas.orderFaultImage.reduce((pre, next) => {
                        pre.push(next.imageUrl);
                        return pre;
                    }, [])
                    commit("SET_FAULTIMAGE", images);
                    commit("SET_DESCRIPTION", datas.orderFaultDescription);
                    /**
                     * 设置负责人
                     */
                    var principal = datas.orderResponsible.length ? datas.orderResponsible[0].orderResponsibleName : "";

                    commit("SET_PRINCIPAL", principal);
                    /**
                     * 设置工单完成时间  
                     */
                    commit("SET_COMPLETEDATE", datas.orderEstimatedFinishTimeStr);
                    /**
                     * 设置配件
                     */
                    commit("SET_FITTINGLIST", datas.orderReplacementParts.projectDetails);
                    commit("SET_FITTINGTYPE", datas.orderReplacementParts.detailStageAmountType);
                    commit("SET_FITTINGAMOUNT", datas.orderReplacementParts.detailStageAmount);
                    /**
                     * 设置服务
                     */
                    commit("SET_SERVICELIST", datas.orderServiceItems.projectDetails);
                    commit("SET_SERVICETYPE", datas.orderServiceItems.detailStageAmountType);
                    commit("SET_SERVICEAMOUNT", datas.orderServiceItems.detailStageAmount);
                    /**
                     * 设置订单信息
                     */
                    // settlementStatusName: "", //订单子状态显示名称(结算状态)
                    // settlementDate: "", //结算时间
                    // settleDate: "", //结清时间
                    // handle: "", //订单已付金额
                    // total: "", //总金额
                    var orderInfo = {
                        createTime: datas.orderAddTimeStr,
                        status: datas.orderStatus,
                        statusName: datas.orderStatusName,
                        createPerson: datas.addUserName,
                        code: datas.orderCode,
                        settlementStatusName: datas.orderNodeStatusName,
                        settlementDate: datas.orderPaymentTimeStr,
                        settleDate: datas.orderSettlementTimeStr,
                        handle: datas.orderAmountPaid,
                        total: datas.orderTotalAmount

                    }
                    commit("SET_ORDERINFO", orderInfo);
                    /**
                     * 设置订单优惠金额
                     */
                    commit("SET_DISCOUNTAMOUNT", datas.orderDiscountAmount);
                    commit("SET_COLLECTIONRECORDS", datas.orderIncomeExpendLog);


                    resolve("获取工单成功")
                } else {
                    reject(res.kfbErrorMsg)
                }
            })
        }).catch(error => {
            reject(error)
        })
    },
    // 设置客户
    setClient({
        state,
        commit,
        rootState
    }, fromData) {
        return new Promise((resolve, reject) => {
            fromData.orderId = state.orderId;
            fromData.storeId = rootState.user.storeId
            modifyClient(fromData).then(res => {
                console.log("添加客户", res);
                if (res.kfbCode == 200) {
                    var clientInfo = {
                        avatar: fromData.driverAvatar, //客户头像 
                        person: fromData.orderContactsPerson, //客户联系人
                        phone: fromData.driverUserPhone, //客户联系电话
                        id: res.datas, //客户id
                        name: fromData.driverUserName, //司机名称
                    }
                    commit("SET__CLIENTINFO", clientInfo)
                    resolve("选择客户成功")
                } else {
                    reject(res.kfbErrorMsg)
                }
            })
        }).catch(error => {
            console.log(error);
        })
    },
    // 设置车辆
    setVehicle({
        state,
        commit,
        rootState
    }, fromData) {
        return new Promise((resolve, reject) => {
            fromData.orderId = state.orderId;
            fromData.storeId = rootState.user.storeId;
            fromData.driverUserId = state.clientInfo.id;
            modifyVehicle(fromData).then(res => {
                console.log("添加车辆", res);
                if (res.kfbCode == 200) {
                    var vehicleInfo = {
                        number: fromData.carPlateNumber, //车牌号
                        code: fromData.carCode, //车辆识别代码 
                        models: fromData.carModels, //车型
                        modelsName: fromData.carModelsName, //车型显示名称
                        modelsNameTwo: fromData.carModelsNameTwo, //二级车型名称(车型图片)
                        mileage: fromData.carMileage, //里程
                    }
                    commit("SET__VEHICLEINFO", vehicleInfo)
                    resolve("保存成功")
                } else {
                    reject(res.kfbErrorMsg)
                }
            })
        }).catch(error => {
            console.log(error);
        })
    },
    // 设置故障信息
    setFaultInfo({
        state,
        commit,
        rootState
    }) {
        return new Promise((resolve, reject) => {
            var fromData = {
                orderId: state.orderId, //订单id
                storeId: rootState.user.storeId,
                faultDescription: state.faultInfo.description, //故障描述
                faultImages: state.faultInfo.images, //故障图片
            }
            modifyFault(fromData).then(res => {
                console.log("修改故障信息", res);
                if (res.kfbCode == 200) {

                    resolve("选择车辆成功")
                } else {
                    reject(res.kfbErrorMsg)
                }
            })
        }).catch(error => {
            console.log(error);
        })
    },
    // 保存配件和服务
    setSave({
        state,
        rootState
    }) {
        return new Promise((resolve, reject) => {

            var fromData = {
                orderId: state.orderId, //订单id
                storeId: rootState.user.storeId,
                orderGoodsUpdateInfo: {
                    detailStageAmountType: state.fittingType,
                    orderGoodsItems: state.fittingList,
                    detailStageAmount: state.fittingAmount
                },
                orderServiceUpdateInfo: {
                    detailStageAmountType: state.serviceType,
                    orderServiceItems: state.serviceList,
                    detailStageAmount: state.serviceAmount
                }
            }
            uniteSaveOrder(fromData).then(res => {
                console.log("保存信息", res);
                if (res.kfbCode == 200) {
                    resolve("选择车辆成功")
                } else {
                    reject(res.kfbErrorMsg)
                }
            })
        }).catch(error => {
            console.log(error);
        })
    },
    // 收款
    setCollect({
        state,
        rootState
    }, fromData) {
        return new Promise((resolve, reject) => {

            fromData.orderId = state.orderId;
            fromData.storeId = rootState.user.storeId
            collectPrice(fromData).then(res => {
                console.log("收款", res);
                if (res.kfbCode == 200) {
                    resolve(res.datas)
                } else {
                    reject(res.kfbErrorMsg)
                }
            })
        }).catch(error => {
            console.log(error);
        })
    },
    // 作废
    setInvalid({
        state,
        rootState
    }, remark) {
        return new Promise((resolve, reject) => {
            var fromData = {
                orderId: state.orderId,
                storeId: rootState.user.storeId,
                remark,
            }
            invalidOrder(fromData).then(res => {
                console.log("作废工单", res);
                if (res.kfbCode == 200) {
                    resolve(res.datas)
                } else {
                    reject(res.kfbErrorMsg)
                }
            })
        }).catch(error => {
            console.log(error);
        })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
import utils from './utils'

let data = {
    className:'one',
    fileds:{
        cpf:{
            name:'cpf',
            tip:'cpf',
            filedType:'input',//input类型
            requestType: 'number',//必须输入数字
            inputType:'tel',
            format:{
                delimiter: ['.', '.', '-'],
                cleave: [3, 3, 3, 2]
            }
        },
        money:{
            name:'money',
            tip:'money',
            filedType:'input',//input类型
            requestType: 'money',//必须输入数字
            inputType:'tel',
            format:{
                delimiter: ['.'],
                cleave: [3,3],
                repeat: true
            }
        }
    }
}
export let UI = utils.init(data);
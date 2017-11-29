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
            max:'11',
            format:{
                delimiters: ['.', '.', '-'],
                blocks: [3, 3, 3, 2]
            },
        },
        money:{
            name:'money',
            tip:'money',
            filedType:'input',//input类型
            requestType: 'money',//必须输入数字
            inputType:'tel',
            max:'11',
            format:{
                numeral: true,
                numeralThousandsGroupStyle: 'thousand'
            }
        },
        email: {
            name: 'email',
            tip: 'Email',
            filedType: 'input',
            style:'width50',
        },
        address: {
            name: 'address',
            tip: 'Address',
            filedType: 'input',
            style:'width50-last'
        }
    }
}
export let UI = utils.init(data);
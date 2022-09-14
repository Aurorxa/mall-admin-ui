import {ElMessage, FormInstance, FormRules} from "element-plus";
import {ChangePasswordFormType} from "@/types/ums/admin";
import {changePassword} from "@/api/ums/admin";

export default function () {
    const formDrawerRef = ref();

    const changePasswordFormRef = ref<FormInstance>()

    const changePasswordForm: ChangePasswordFormType = reactive<ChangePasswordFormType>({
        oldPassword: '123456',
        newPassword: '123456',
        confirmPassword: '123456'
    })

    const validateConfirmPassword = (rule: any, value: any, callback: any) => {
        if (value === '') {
            callback(new Error('确认密码为必填项'))
        } else if (value !== changePasswordForm.newPassword) {
            callback(new Error("新密码和确认密码需要一样~"))
        } else {
            callback()
        }
    }

    // 验证规则
    const changePasswordRules: FormRules = reactive<FormRules>({
        oldPassword: [
            {
                required: true, message: '原密码为必填项', trigger: 'change'
            },
            {
                min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change'
            }
        ],
        newPassword: [
            {
                required: true, message: '新密码为必填项', trigger: 'change'
            },
            {
                min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change'
            }
        ],
        confirmPassword: [
            {
                required: true, message: '确认密码为必填项', trigger: 'change'
            },
            {
                min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change'
            },
            {
                validator: validateConfirmPassword, trigger: 'blur'
            }
        ],
    })

    // 处理修改密码
    const onSubmit = () => {
        // 进行表单验证
        changePasswordFormRef.value?.validate(async valid => {
            if (!valid) { // 如果表单验证失败，就返回 false
                return false
            } else {
                try {
                    formDrawerRef.value.showLoading()
                    await changePassword(changePasswordForm)
                    // 提示登录成功
                    ElMessage({
                        message: '修改密码成功',
                        type: 'success',
                        center: true,
                        duration: 1000
                    })
                    formDrawerRef.value.close();
                } catch (e) {
                    console.log(e)
                } finally {
                    formDrawerRef.value.closeLoading()
                }
            }
        })
    }

    return {
        formDrawerRef,
        changePasswordForm,
        changePasswordFormRef,
        changePasswordRules,
        onSubmit
    }
}


import { loadFromStorage, saveToStorage } from './loadSaveStorage';
import { countColumnsEffect } from './utils'
import { demoDashboard, demoUnderTask } from '../assets/demoData'

// ключи локального хранилища для записи данных dashboard
const KEY_PREFIX_TASK = '-t'
const KEY_PREFIX_UNDER_TASK = '--under-t'

class DemoApiDashboard {
    demo=true
    key_prefix_task = KEY_PREFIX_TASK
    // demo::true(default) - определяет какие данные получаем

    getAllTasks(setAttr, params){
        // получение данных из внешних источников для загрузки
        loadFromStorage(this.key_prefix_task).then((content) => {
            if (content === undefined) {
                const _data = this._dispatchManipulateData('countColumnsEffect', demoDashboard)
                this._updateTasks(setAttr, _data)
            } else {
                setAttr(content)
            }
        });
    }

    updateTasks(setAttr, params){
        // обновление всего массива данных dashboard без вложенных под задач
        const _data = this._dispatchManipulateData('countColumnsEffect', params)
        this._updateTasks(setAttr, _data)
    }

    updateOrder(setAttr, params){
        // обновление порядка сортировки columns or task
        this._updateTasks(setAttr, params)
    }
    
    deleteAllTasks(params){
        // удаление всех задач и под задач
        return params
    }
    
    deleteTasks(params){
        // удаление задачи
        return params
    }
    
    addTasks(params){
        // удаление задачи
        return params
    }

    _updateTasks(setAttr, data){
        // обновление списка задач
        setAttr(data)
        saveToStorage(data, this.key_prefix_task)
    }

    dispatchTask(method, setAttr, params) {
        // диспетчер загрузки, обновления и удаления данных
        switch(method){
            case 'getAllTask':
                this.getAllTasks(setAttr, params)
                return true
            case 'updateTasks':
                this.updateTasks(setAttr, params)
                return true
            case 'updateOrder':
                this.updateOrder(setAttr, params)
                return true
            default:
                alert(`method ${method} - missing`)
                return false
        }
    }

    _dispatchManipulateData(method, params) {
        // диспетчер манипуляции с данными при их обновлении
        switch(method){
            case 'countColumnsEffect':
                return countColumnsEffect(params)
            default:
                return `method ${method} - missing`
        }
    }
}

const demoApiDashboard = new DemoApiDashboard()

export default demoApiDashboard
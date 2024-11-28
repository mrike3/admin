<script setup lang="ts">
import { ref,onMounted,reactive } from 'vue'
import axios from 'axios'
import { ElMessage, ElMessageBox } from "element-plus";
import * as XLSX from 'xlsx'
import FileSaver from 'file-saver'

const SearchWindow=ref(true) // 搜索弹窗
const plAddHouseWindow=ref(false) // 搜索弹窗
const AddDrawer = ref(false) // 新增房源弹窗
const houses = ref([]) // 房源总列表
const location = ref([]) // 房源地区列表 用于筛选

const currentPage=ref(1) // 当前页码
const currentPageSize=ref(10) // 当前页码
const HouseTab=ref([])

onMounted(()=>{
  getHouses()
})

function downloadHouseExcelMB() {
  const ws = XLSX.utils.table_to_book(document.querySelector('#house-MB'))
  const wbout = XLSX.write(ws, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'array'
  });
  FileSaver.saveAs(new Blob([wbout], {
    type: "application/octet-stream"
  }), '房源数据模版.xlsx')
}

function readHouseExcel(file) {
//读取房源excel文件
  const reader = new FileReader();
  reader.onload=function(e1){
    // @ts-ignore 忽略类型错误
    const data = new Uint8Array(e1.target.result);
    const workbook = XLSX.read(data, {type: 'array'});

    // 获取第一个工作表
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    // 将工作表转换为JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    let promises = []
    jsonData.forEach((item, index)=>{
      if(index!=0){
        const data={
          location: '',
          area: '',
          address: '',
          type: '',
          mobile: '',
          registerTime: '',
        }
        var date=new Date();
        var year=date.getFullYear();
        var month=date.getMonth()+1;
        var day=date.getDate();
        var hour=date.getHours();
        var minute=date.getMinutes();
        var second=date.getSeconds();
        var newDate=year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
        data.registerTime=newDate
        // @ts-ignore
        data.location=item[0]
        // @ts-ignore
        data.area=item[1]
        // @ts-ignore
        data.address=item[2]
        // @ts-ignore
        data.type=item[3]
        // @ts-ignore
        data.mobile=item[4]
        promises.push(
          // @ts-ignore
          axios.get('http://localhost:8082/AddHouse',{params:data}).catch(err => {
            console.log(err)
          })
        )
      }
    })
    Promise.all(promises).then(res => {
      getHouses()
      plAddHouseWindow.value=false
      ElMessage.success('导入成功')
    })
  }
  reader.readAsArrayBuffer(file);
}

function pageChange(){
  HouseTab.value=houses.value.slice(currentPage.value*currentPageSize.value-currentPageSize.value,currentPage.value*currentPageSize.value)
}

// 导出房源数据
function exportHousesExcel() {
  const ws = XLSX.utils.table_to_book(document.querySelector('#house-table'))
  const wbout = XLSX.write(ws, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'array'
  });
  FileSaver.saveAs(new Blob([wbout], {
    type: "application/octet-stream"
  }), '房源数据.xlsx')

}


function getHouses() {
  // 获取房源总列表
  axios.get('https://mock.presstime.cn/mock/67207927caf0b4e52f1229cc/example/mrike').then(res => {
    houses.value = res.data.projects
    location.value=[]
    HouseTab.value=houses.value.slice(currentPage.value*10-10,currentPage.value*10)
    houses.value.forEach((item, index)=>{
      var flag=true
      location.value.forEach(function (it,index1){
        // @ts-ignore
        if(it.text==item.location){
          flag=false
        }
      })
      if(flag){
        var a2={
          // @ts-ignore
          text:item.location,
          // @ts-ignore
          value:item.location
        }
        // @ts-ignore
        location.value.push(a2)
      }
    })
  }).catch(err => {
    console.log(err)
  })
}
// 筛选方法
function sx(str,row){
  return row.location===str
}
function clearAddHouse() {
  Object.keys(Addhouse.value).forEach(key => {
    Addhouse.value[key] = ''
  })
}
async function AddHouse() {
  await formEl.value.validate((valid)=>{
    if (valid){
      var date=new Date();
      var year=date.getFullYear();
      var month=date.getMonth()+1;
      var day=date.getDate();
      var hour=date.getHours();
      var minute=date.getMinutes();
      var second=date.getSeconds();
      var newDate=year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
      Addhouse.value.registerTime=newDate
      axios.get('http://localhost:8082/AddHouse',{params:Addhouse.value}).then(res => {
        if(res.data){
          getHouses()
          AddDrawer.value=false
          clearAddHouse()
          ElMessage.success('新增成功')
        }
      }).catch(err => {
        console.log(err)
      })
    }else{
      ElMessage.error('请检查输入项')
    }
  })

}
function deleteHouse(row){
  ElMessageBox.confirm('确定删除该房源吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    axios.get('http://localhost:8082/deleteVUE',{params:{id:row.id}}).then(res => {
      if(res.data){
        ElMessage.success('删除成功')
        getHouses()
      }
    }).catch(err => {
      console.log(err)
    })
  })
}


const address = ref('')
const area=ref({
  max: '',
  min: '',
})
const Addhouse=ref({
  location: '',
  area: '',
  address: '',
  type: '',
  mobile: '',
  registerTime: '',
})
const formEl=ref(null)
const Houserules=ref({
  location: [
    { required: true, message: '请输入房源地区', trigger: 'blur' }
  ],
  area: [
    { required: true, message: '请输入房源面积', trigger: 'blur' }
  ],
  address: [
    { required: true, message: '请输入房源地址', trigger: 'blur' }
  ],
  type: [
    { required: true, message: '请输入房源类型', trigger: 'blur' }
  ],
  mobile: [
    { required: true, message: '请输入联系电话', trigger: 'blur' }
  ],
})
</script>

<template>
  <el-row id="house-container" align="middle" justify="start">
    <!--    Excel房源模板-->
    <el-table id="house-MB" style="display: none">
      <el-table-column label="房源地区"></el-table-column>
      <el-table-column label="房源面积"></el-table-column>
      <el-table-column label="房源地址"></el-table-column>
      <el-table-column label="房源类型"></el-table-column>
      <el-table-column label="联系电话"></el-table-column>
    </el-table>

    <el-drawer v-model="AddDrawer" title="新增房源">
      <template #default>
        <el-form label-position="right" ref="formEl" status-icon  :model="Addhouse" :rules="Houserules">
          <el-form-item label="房源地区：" prop="location">
            <el-input placeholder="请输入房源地区"  v-model="Addhouse.location" ></el-input>
          </el-form-item>
          <el-form-item label="房源面积：" prop="area">
            <el-input type="number" placeholder="请输入房源面积" v-model="Addhouse.area" ></el-input>
          </el-form-item>
          <el-form-item label="房源地址：" prop="address">
            <el-input type="text" placeholder="请输入房源地址" v-model="Addhouse.address" ></el-input>
          </el-form-item>
          <el-form-item label="房源类型：" prop="type">
            <el-input type="text" placeholder="请输入房源类型" v-model="Addhouse.type" ></el-input>
          </el-form-item>
          <el-form-item label="联系电话：" prop="mobile">
            <el-input type="number" placeholder="请输入联系电话" v-model="Addhouse.mobile" ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button type="primary" @click="AddHouse">保存</el-button>
        <el-button type="info" @click="clearAddHouse">重置</el-button>
      </template>
    </el-drawer>

    <el-dialog v-model="plAddHouseWindow" title="批量导入房源" width="580px">
      <el-row style="width: 100%;padding-left: 20px;flex-direction: column">
        <el-form-item label="模板下载：">
          <el-button type="primary" @click="downloadHouseExcelMB">
            <template #icon>
              <el-icon><Download /></el-icon>
            </template>
            点击下载</el-button>
        </el-form-item>
        <el-form-item label="文件上传：">
          <el-upload drag :show-file-list="false" style="width: 352px" :before-upload="readHouseExcel">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              将文件拖到此处或<em>点击上传</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                请上传 .xls , .xlsx 标准格式文件
              </div>
            </template>
          </el-upload>
        </el-form-item>
      </el-row>
    </el-dialog>

    <el-row justify="center" align="middle" class="borderClass house-search-container" v-if="SearchWindow">
      <el-col :span="18" style="font-size: 14px;color: gray;">
        <el-space size="large">
          <div>
            所在区域：
            <el-select style="width: 150px" v-model="address" size="default" clearable>
              <el-option label="北京" value="北京"></el-option>
              <el-option label="上海" value="上海"></el-option>
              <el-option label="广州" value="广州"></el-option>
              <el-option label="深圳" value="深圳"></el-option>
            </el-select>
          </div>
          <div>
            面积范围：
            <el-input type="number" placeholder="最小面积" style="width: 110px" v-model="area.min"></el-input>
            ——
            <el-input type="number" style="width: 110px" placeholder="最大面积" v-model="area.max"></el-input>
          </div>
        </el-space>
      </el-col>

      <el-col :span="6" style="text-align: right">
        <el-button type="primary">搜索<template #icon><el-icon><Search /></el-icon></template>
        </el-button>
        <el-button type="default">重置<template #icon><el-icon><Delete /></el-icon></template></el-button>
      </el-col>
    </el-row>

    <el-row justify="center" align="top" class="borderClass" style="margin-top: 20px;flex-grow: 1;padding: 25px;height: 200px;">
      <el-row style="width: 100%;">
        <el-col :span="16">
          <el-button type="primary" @click="AddDrawer=true">新增房源
            <template #icon><el-icon><CirclePlus /></el-icon></template>
          </el-button>
          <el-button type="primary" @click="exportHousesExcel" plain>导出房源数据
            <template #icon><el-icon><Download /></el-icon></template>
          </el-button>
          <el-button type="primary" plain @click="plAddHouseWindow=true">批量导入房源
            <template #icon><el-icon><Upload /></el-icon></template>
          </el-button>
          <el-button type="info" plain>选择第三房源
            <template #icon><el-icon><Upload /></el-icon></template>
          </el-button>
        </el-col>
        <el-col :span="8" style="text-align: right">

          <el-button round>
            <template #icon>
              <el-icon><Filter /></el-icon>
            </template>
          </el-button>
          <el-button round>
            <template #icon>
              <el-icon><Refresh /></el-icon>
            </template>
          </el-button>
          <el-button circle @click="SearchWindow=!SearchWindow">
            <template #icon>
              <el-icon><Search /></el-icon>
            </template>
          </el-button>
        </el-col>
      </el-row>
      <br/>
      <br/>
      <!--      表格-->
      <div style="width: 100%;height: 80%;">
        <el-table id="house-table" :data="HouseTab" stripe border show-summary  height="100%"  :header-cell-style="{'background-color': 'var(--el-table-border-color)',color:'var(--el-text-color)'}">
          <el-table-column type="selection" align="center" width="60"></el-table-column>
          <!--          <el-table-column prop="id" class-name="Id" v-if="false"></el-table-column>-->
          <el-table-column type="index" label="序号" width="60" align="center">
            <template #default="scope">{{scope.$index+currentPageSize*(currentPage-1)+1}}</template>
          </el-table-column>
          <el-table-column label="房源地区" fixed="right" prop="location" :filters="location" :filter-method="sx" align="center" width="100">
            <template #default="scope">
              <el-tag :type="scope.row.location === '五华区' ? 'success' : 'primary'">
                {{scope.row.location}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column sortable label="面积" prop="area"  align="center" width="100"></el-table-column>
          <el-table-column label="地址" prop="address" width="300" align="center"></el-table-column>
          <el-table-column label="类型" prop="type" align="center" width="100"></el-table-column>
          <el-table-column label="电话" prop="mobile" align="center" width="300">
            <template #header>
              <el-icon><Phone /></el-icon>&nbsp;&nbsp;手机号
            </template>
          </el-table-column>
          <el-table-column sortable label="修改时间" prop="registerTime" align="center" width="200">
            <template #default="scope">
              <el-icon><Timer /></el-icon>
              {{scope.row.registerTime}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300" fixed="right">
            <template #default="scope">
              <el-button type="primary" size="small">编辑
                <template #icon>
                  <el-icon><EditPen /></el-icon>
                </template>
              </el-button>
              <el-button type="danger" size="small" @click="deleteHouse(scope.row)">删除
                <template #icon>
                  <el-icon><Delete /></el-icon>
                </template>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--      page-size不能在前面加:-->
      <el-row style="width: 100%;margin-top: 10px;" align="middle" justify="center" >
        <el-pagination v-model:current-page="currentPage" background :page-sizes="[10, 20, 30, 40, 50, 100]"
                       layout="total,sizes,prev, pager, next,jumper" @current-change="pageChange"
                       :total="houses.length" v-model:page-size="currentPageSize"
                       @size-change="pageChange">
          >

        </el-pagination>
      </el-row>

    </el-row>
  </el-row>
</template>

<style scoped>
#house-container {
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding:10px;
}
.house-search-container{
  padding: 15px;
}
.borderClass {
  width: 100%;
  background-color: var(--el-bg-color);
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>

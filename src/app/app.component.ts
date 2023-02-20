import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  folder_name: any
  where_am_i: string
  stack: string[]

  constructor() {
    this.where_am_i = "root"
    this.stack = ["root"]
  }

  getFile(event: any) {
    var reader = new FileReader()
    let that = this
    let name = event.target.files[0].name
    reader.readAsDataURL(event.target.files[0])
    reader.onload = () => {
      if (reader.result && localStorage) {
        window.localStorage.setItem(name, JSON.stringify({ "content": reader.result, "parent": this.where_am_i, "type": "file" }))
        alert('success')
        that.file_disp()
      }
      else {
        alert('failure')
      }
    }
  }

  file_disp() {
    let FileContent = document.getElementById('fileCont')
    FileContent!.innerHTML = ''
    FileContent!.style.display = "flex"
    FileContent!.style.flexWrap = "wrap"
    for (let i = 0; i < window.localStorage.length; i++) {
      let res = window.localStorage.getItem(<string>window.localStorage.key(i))
      let res_result = JSON.parse(<string>res)
      if (res_result.type == "file" && res_result.parent == this.where_am_i) {
        let img = document.createElement('object')
        let div = document.createElement('div')
        let file_icon = document.createElement('img')
        let span = document.createElement('span')
        let wrapper_div = document.createElement('div')

        img.data = res_result.content
        img.style.width = "205px"
        img.style.height = "150px"
        img.style.borderTopRightRadius = "8px"
        img.style.borderTopLeftRadius = "8px"
        img.style.paddingLeft = "10px"
        img.style.paddingRight = "10px"
        img.style.paddingTop = "15px"

        div.style.width = "225px"
        div.style.height = "35px"
        div.style.borderTop = "2px solid #dadce0"
        div.style.display = "flex"
        div.style.alignItems = "center"

        let file_name = window.localStorage.key(i)
        let file_extension = file_name?.split('.').pop()?.toLowerCase()

        file_icon.style.width = "20px"
        file_icon.style.height = "20px"
        file_icon.style.padding = "9px"
        file_icon.style.textAlign = "center"

        div.appendChild(file_icon)

        if (file_extension === 'png')
          file_icon.src = './assets/png.png'
        else if (file_extension === 'jpg')
          file_icon.src = './assets/jpg.png'
        else if (file_extension === 'pdf')
          file_icon.src = './assets/pdf.png'
        else
          file_icon.src = './assets/file.png'

        span.innerHTML = `${file_name}`
        span.style.width = "160px"
        span.style.fontSize = "12.5px"
        span.style.color = "#3c4043"
        span.style.fontWeight = "600"
        span.style.fontFamily = "'Roboto',Helvetica,Arial,sans-serif"
        span.style.whiteSpace = "nowrap"
        span.style.textOverflow = "ellipsis"
        span.style.overflow = "hidden"

        div.appendChild(span)

        wrapper_div?.appendChild(img)
        wrapper_div?.appendChild(div)
        wrapper_div.style.margin = "7px"
        wrapper_div.style.borderRadius = "8px"
        wrapper_div.style.border = "2px solid #dadce0"

        FileContent?.append(wrapper_div)


      }
    }

  }
  setTemplate() {

    let wrapperModalContainer = document.createElement('div')
    let ModalContainer = document.createElement('div')
    let header = document.createElement('span')
    let inp = document.createElement('input')
    let btn_div = document.createElement('div')
    let create = document.createElement('button')
    let cancel = document.createElement('button')

    wrapperModalContainer.style.backgroundColor = "rgb(0,0,0,0.2)"
    wrapperModalContainer.style.position = "fixed"
    wrapperModalContainer.style.top = "0"
    wrapperModalContainer.style.left = "0"
    wrapperModalContainer.style.opacity = "1"
    wrapperModalContainer.style.pointerEvents = "auto"
    wrapperModalContainer.style.width = "100vw"
    wrapperModalContainer.style.height = "100vh"
    wrapperModalContainer.style.display = "flex"
    wrapperModalContainer.style.alignItems = "center"
    wrapperModalContainer.style.justifyContent = "center"
    wrapperModalContainer.style.transition = "1s ease"

    ModalContainer.style.width = "270px"
    ModalContainer.style.padding = "10px 20px"
    ModalContainer.style.maxWidth = "100vw"
    ModalContainer.style.display = "flex"
    ModalContainer.style.alignItems = "flex-start"
    ModalContainer.style.justifyContent = "center"
    ModalContainer.style.flexDirection = "column"
    ModalContainer.style.backgroundColor = "white"
    ModalContainer.style.borderRadius = "10px"
    ModalContainer.style.textAlign = "center"

    header.textContent = "New folder"
    header.style.fontFamily = "'Roboto',Helvetica,Arial,sans-serif"
    header.style.fontSize = "22px"
    header.style.color = "#3f4346"
    header.style.margin = "7px"

    inp.setAttribute('id', 'inp1')
    inp.value = "Untitled folder";
    inp.style.margin = "7px"
    inp.style.padding = "10px"
    inp.style.width = "90%"
    inp.style.alignSelf = "center"
    inp.style.borderRadius = "5.5px"
    inp.style.border = "2px solid #2770d4"

    create.textContent = "Create"
    create.style.color = "#2770d4"
    create.style.backgroundColor = "white"
    create.style.border = "none"
    create.style.borderRadius = "4px"
    create.style.fontSize = "14px"
    create.style.fontFamily = "'Roboto',Helvetica,Arial,sans-serif"
    create.style.margin = "18px 5px 0px 5px"
    create.style.padding = "7px"

    cancel.textContent = "Cancel"
    cancel.style.color = "#3f4346"
    cancel.style.backgroundColor = "white"
    cancel.style.border = "none"
    cancel.style.borderRadius = "4px"
    cancel.style.fontSize = "14px"
    cancel.style.fontFamily = "'Roboto',Helvetica,Arial,sans-serif"
    cancel.style.margin = "18px 5px 0px 5px"
    cancel.style.padding = "7px"


    cancel.onmouseover = () => {
      cancel.style.color = "#2770d4"
      cancel.style.backgroundColor = "rgba(0,0,0,0.05)"
    }
    cancel.onmouseout = () => {
      cancel.style.color = "#4c5053"
      cancel.style.backgroundColor = "white"
    }

    create.onmouseover = () => {
      create.style.backgroundColor = "rgba(0,0,0,0.05)"
    }
    create.onmouseout = () => {
      create.style.backgroundColor = "white"
    }

    btn_div.style.marginLeft = "130px"
    btn_div.appendChild(cancel)
    btn_div.appendChild(create)

    ModalContainer.appendChild(header)
    ModalContainer.appendChild(inp)
    ModalContainer.appendChild(btn_div)
    wrapperModalContainer.appendChild(ModalContainer)

    document.getElementById('cFolder')?.appendChild(wrapperModalContainer)
    inp.select()

    cancel.onclick = () => {
      document.getElementById('cFolder')?.removeChild(wrapperModalContainer)
    }

    create.onclick = () => {
      this.folder_name = inp.value
      localStorage.setItem(this.folder_name, JSON.stringify({ "content": this.folder_name, "parent": this.where_am_i, "type": "folder" }))
      document.getElementById('cFolder')?.removeChild(wrapperModalContainer)
      this.folder_disp()
    }


  }

  folder_disp() {
    document.getElementById('folCont')!.innerHTML = ''
    for (let i = 0; i < window.localStorage.length; i++) {
      let getKey = window.localStorage.key(i)
      let res = window.localStorage.getItem(<string>getKey)
      let res_result = JSON.parse(<string>res)
      if (res_result.type == "folder" && res_result.parent == this.where_am_i) {
        let wrapper_folder = document.createElement('div')
        let folder_icon = document.createElement('img')
        let folder_name = document.createElement('div')

        wrapper_folder.style.width = "205px"
        wrapper_folder.style.height = "45px"
        wrapper_folder.style.display = "flex"
        wrapper_folder.style.alignItems = "center"
        wrapper_folder.style.justifyContent = "space-around"

        folder_icon.src = "./assets/folder.png"
        folder_icon.style.width = "10%"
        folder_icon.style.height = "23px"
        folder_icon.style.padding = "10px"
        folder_icon.style.textAlign = "center"

        folder_name.innerHTML = `${res_result.content}`
        folder_name.style.width = "70%"
        folder_name.style.fontSize = "13px"
        folder_name.style.color = "#3c4043"
        folder_name.style.fontWeight = "600"
        folder_name.style.fontFamily = "'Roboto',Helvetica,Arial,sans-serif"
        folder_name.style.marginLeft = "15px"
        folder_name.style.whiteSpace = "nowrap"
        folder_name.style.textOverflow = "ellipsis"
        folder_name.style.overflow = "hidden"

        wrapper_folder.appendChild(folder_icon)
        wrapper_folder.appendChild(folder_name)
        wrapper_folder.style.border = "1px solid black"
        wrapper_folder.style.border = "2px solid #dadce0"
        wrapper_folder.style.borderRadius = "5px"
        wrapper_folder.style.marginRight = "20px"
        wrapper_folder.style.marginBottom = "15px"
        document.getElementById('folCont')?.appendChild(wrapper_folder)

        wrapper_folder.addEventListener('click', () => {
          this.where_am_i = folder_name.innerHTML
          this.file_disp()
          this.folder_disp()
        })
      }
    }
  }

  ngOnInit(): void {
    this.file_disp()
    this.folder_disp()
    let da=document.getElementById('dragArea')
    da!.addEventListener('dragover',(event)=>{
        event.preventDefault()
        console.log('inside');
        da!.classList.add('active')
    })
    da!.addEventListener('dragleave',()=>{
        console.log('outside');
        da!.classList.remove('active')
    })
    
    da!.addEventListener("drop",(event)=>{
        event.preventDefault()
        da?.classList.remove('active')
        console.log('file dropped');
        let reader = new FileReader()
        let file = event.dataTransfer!.files[0]
        reader.readAsDataURL(file)
        reader.onload = () => {
          if (reader.result && localStorage) {
            window.localStorage.setItem(file.name, JSON.stringify({ "content": reader.result, "parent": "root", "type": "file" }))
            alert('success')
            this.file_disp()
          }
          else {
            alert('failure')
          }
        }
    })
  }

}



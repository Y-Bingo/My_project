!(function() {
  // 'use strict';

  var $form_add_task = $(".add-task"),
        $delete_task = {},//
        $detail_task = {},//存储任务详情-1
        $check_complete = {},//完成的任务
        $task_detail = $(".task-detail"),
        $task_detail_mask = $(".task-detail-mask"),
        task_list = [],//存储任务列表
        update_form,
        $task_detail_content = {},
        curret_index;
  init();//初始化
  $form_add_task.on("submit", function(e) {
    let new_task = {};
    // 禁止默认行为
    e.preventDefault();
    let $input = $(this).find("input[name=content]");
    // 获取新task的值
    new_task.content = $input.val();
    // 判断内容是否为空,不为空则继续执行
    if (!new_task.content) return;
    // 存入新的task
    if (add_task(new_task)) {
      $input.val("");
    }
    // console.log('new_task', new_task);
  });
  $task_detail_mask.on("click", function() {
    hide_task_detail();
  });

  function my_alert(arg){
    if(!arg) {
      console.error('alert msg is required')
    };
    let conf = {}
        ,$box
        ,$mask
        ,$title
        ,$content
        ,$confirm
        ,$cancel
        ,dfd
        ,confirmed
        ,timer;

    dfd = $.Deferred();

     // 对传入的参数进行判断
    if(typeof arg == "string"){
      conf.title = arg;
    }else{
      conf = $.extend(conf, arg);//合并对象
    }

    $mask = $("<div></div>")
            .css({
              position: "fixed",
              top     :  "0",
              bottom  :  "0",
              left    :  0,
              right   :  0,
              backgroundColor: "rgba(0,0,0,.3)"
            });
    $box = $(`<div>
                <div class="alert-title">${arg}</div>
                <div class="alert-content"></div>
                <div style = 'text-align:center;'>
                    <button class='alert-confirm'>确认</button>
                    <button class='alert-cancel'>取消</button>
                </div>
              </div>`)
           .css({
             position : "fixed",
             width:"500px",
             height:"100px",
             backgroundColor:"#fff",
             "border-radius" : 3,
             "box-shadow"    : '0 1px 2px rgba(0,0,0,.3)',
           });
    $title = $box.find(".alert-title").css({
        padding : '5px 10px',
        'color':"#333",
        "font-weight" : 900,
        "font-size" : 20,
        "text-align": "center"
    });

    $content = $box.find(".alert-content").css({
        padding : '5px 10px',
        'color' : '#333',
        'text-align':'center'
    });

    timer = setInterval(function(){
      if(confirmed !== undefined){
        dfd.resolve(confirmed);
        clearInterval(timer);
        remove_alert();
      }
    },50)

    $confirm = $box.find(".alert-confirm");
    $cancel = $box.find(".alert-cancel");

    $confirm.on('click', function(){
      confirmed = true;
    });
    $cancel.on('click',function(){
      confirmed = false;
    });
    $mask.on('click',function(){
      confirmed = false;
    })

    // 移除弹出框
    function remove_alert(){
      $mask.remove();
      $box.remove();
    }
    // 定位弹出框
    function adjust_box_position(){
      let window_w = $(window).width(),
          window_h = $(window).height(),
          box_w = $box.width(),
          box_h = $box.height(),
          pos_l = (window_w - box_w)/2,
          pos_t = (window_h - box_h)/2 - 30;
      $box.css({
        left  :pos_l,
        top   :pos_t
      });
    } 
    adjust_box_position();
    
    // 弹窗的盒子添加
    $mask.appendTo($('body'));
    $box.appendTo($('body'));
    $(window).on('resize',function(){
        adjust_box_position();
    });
    return dfd.promise();//返回一个promis对象
  }




  // 绑定监听事件，打开详情面板
  function listen_task_detail() {
    var index ;
    $(".task-item").on("dblclick", function(){
        index = $(this).data("index");
        show_task_detail(index);
    })
    $detail_task.on("click", function() {
  
      var $this = $(this);
      var $item = $this.parents(".task-item");
       index = $item.data("index");
      show_task_detail(index);
    });
  }
  // 绑定监听删除按钮
  function listen_task_delete() {
    $delete_task.on("click", function() {
      var $this = $(this);
      var $item = $this.parents(".task-item");
      var index = $item.data("index");
      // var tmp = confirm("确定删除？");
      my_alert("确定要删除吗？")
        .then(function(res){
            if(res){
              delete_task(index);
            }
          });
      // tmp ? delete_task(index) : null;
    });
  }
  // 监听绑定任务完成按钮事件
  function listen_task_compelete() {
     $check_complete.on('click',function(){
         let is_complete = $(this).is(":checked") ;
         let index = $(this).parents(".task-item").data("index");
         update_task(index , {is_complete});
         
         var item = store.get("task_list")[index];
     })
  }
  //   查看详情
  function show_task_detail(index) {
    current_index = index;
    render_task_detail(index);
    $task_detail.show();
    $task_detail_mask.show();
  }
  // 隐藏详情面板
  function hide_task_detail() {
    $task_detail.hide();
    $task_detail_mask.hide();
  }
  // 更新数据
  function update_task(index, data) {
    // if (!index || !task_list[index])  return;
   $.extend(task_list[index], data);
    refresh_task_list();
  }
  // 刷新localstrage数据并渲染模版
  function refresh_task_list() {
    store.set("task_list", task_list);
    render_task_list();
  }
  // 添加任务
  function add_task(new_task) {
    // 将新的task放进list里面
    task_list.push(new_task);
    // 更新list
    refresh_task_list();
    return true;
  }
  // 删除任务
  function delete_task(index) {
    // 如果没有index 或者index 不存在直接返回
    if (index === undefined || !task_list[index]) return;

    delete task_list[index];

    refresh_task_list();
  }
  // 初始化任务力列表
  function init() {
    task_list = store.get("task_list") || [];
    if (task_list.length) {
      render_task_list();
    }
    task_remind_check();
  }

  function task_remind_check(){
    var cur_timestamp;
   var task = setInterval(function(){
      for(var i=0; i<task_list.length; i++){
        var item = store.get("task_list")[i]
            ,task_timestamp;
        if( !item || !item.date || item.informed ) continue;
        cur_timestamp = (new Date()).getTime();
        task_timestamp = (new Date(item.date)).getTime();
        if(cur_timestamp - task_timestamp >=1 ){
          update_task(i, {informed: true})
          show_msg(item.content);//提醒
        }
      }
    },500)
  }

  function show_msg(content){
    $(".msg").html(content).show(); 
  }
  function hide_msg(content){
    $(".msg").hide(); 
  }
  // 任务列表模版
  function render_task_list() {
    var $task_list = $(".task-list");
    $task_list.html(""); //清空原来有的内容
    for (var i = 0; i < task_list.length; i++) {
      var $task_item = render_task_item(task_list[i], i);
      if(!task_list[i])continue;//如果item 不存在直接跳出本次循环
      if(task_list[i].is_complete){
          $task_item.addClass('completed');
          $task_list.append($task_item);
      }else{
          $task_list.prepend($task_item);
      }
    }

    $delete_task = $(".delete");
    $detail_task = $(".detail");
    $check_complete = $task_list.find(".complete");
    listen_task_delete();
    listen_task_detail();
    listen_task_compelete();
  }
  // 单个任务列表模版
  function render_task_item(data, index) {
    if (!data || index === undefined) return;
    var list_item_tpl =
      '<div class="task-item" data-index="' +
      index +
      '">' +
      '<span><input type="checkbox" name="" class="complete" '+(data.is_complete?"checked":"")+'></span>' +
      '<span class="task-content">' +
      data.content +
      "</span>" +
      '<span class="fr">' +
      '<span class="anchor delete">删除</span>' +
      '<span class="anchor detail">详细</span>' +
      "</span>" +
      "</div>";
    return $(list_item_tpl);
  }
  // 任务详情模版
  function render_task_detail(index) {
    if (!task_list[index] || index === undefined) return;
    var item = task_list[index];
    var task_detail = ` <form>
        <div class="content">${item.content}</div>
        <div class="content-input" style="display:none;">
            <input autoFocus type="text" name="content" value="${item.content}"/></div>
        <div>
            <div class="desc">
                <textarea name="desc" id="">${item.desc || ""}</textarea>
            </div>
        </div>
        <div class="remind">
            <label>提醒时间</label>
            <input type="text" class="datetime" name="datetime" value="${(item.date || "")}">
            <!-- <button type="submit">submit</button> -->
        </div>
        <div><button type="submit">更新</button></div>
        </form>
       `;
    // 添加时间日历

    $task_detail.html(task_detail);
    $update_form = $task_detail.find("form");
    $(".datetime").datetimepicker();//要定义在模版实例化之后
    $task_detail_content = $task_detail.find(".content");
    $task_detail_input = $task_detail.find(".content-input");
    $update_form.on("submit", function(e) {
      e.preventDefault();
      var data = {};
      data.content = $(this).find("[name=content]").val();
      data.desc = $(this).find("[name=desc]").val();
      data.date = $(this).find("[name=datetime]").val();
      update_task(index, data);
      $task_detail.hide();
      $task_detail_mask.hide();
      // console.log(data);
    });
    // 显示内容更改
    $task_detail_content.on("dblclick",function(e){
        $task_detail_input.show();
        $task_detail_content.hide();
    })
  }
})();

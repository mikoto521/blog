layui.use(['form','layer','laydate','table','laytpl'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //新闻列表
    var tableIns = table.render({
        elem: '#newsList',
        url : '/news/list', //  ../../json/newsList.json
        cellMinWidth : 95,
        page : true,
        height : "full-125",
        limit : 10,
        limits : [5,10,15,20,25],
        id : "newsListTable",
        cols : [[
            {type: "checkbox", fixed:"left", width:50},
            {field: 'newsId', title: 'ID', width:60, align:"center",style:"display:none"},
            {field: 'newsName', title: '文章标题', width:350},
            {field: 'newsAuthor', title: '发布者', align:'center'},
            {field: 'newsStatus', title: '发布状态',  align:'center',templet:"#newsStatus"},
            {field: 'newsLook', title: '浏览权限', align:'center',templet:"#newsLook"},
            {field: 'newsTop', title: '是否置顶', align:'center', templet:function(d){
                    return '<input type="checkbox" name="newsTop" lay-filter="newsTop" lay-skin="switch" lay-text="是|否" '+d.newsTop+'>'
                }},
            {field: 'newsTime', title: '发布时间', align:'center', minWidth:110, templet:function(d){
                    return d.newsTime.substring(0,10);
                }},
            {title: '操作', width:170, templet:'#newsListBar',fixed:"right",align:"center"}
        ]],
        done: function () {
            $("[data-field='newsId']").css('display','none');
        }
    });

    //是否置顶
    form.on('switch(newsTop)', function(data){
        var index = layer.msg('修改中，请稍候',{icon: 16,time:false,shade:0.8});
        setTimeout(function(){
            layer.close(index);
            if(data.elem.checked){
                layer.msg("置顶成功！");
            }else{
                layer.msg("取消置顶成功！");
            }
        },500);
    })

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click",function(){
        if($(".searchVal").val() != ''||true){//搜索为空时服务器端查询所有
            table.reload("newsListTable",{
                where:{
                    newsname:$(".searchVal").val()
                },
                elem: '#newsList',
                url : '/news/list', //  ../../json/newsList.json
                cellMinWidth : 95,
                page : true,
                height : "full-125",
                limit : 10,
                limits : [5,10,15,20,25],
                id : "newsListTable",
                cols : [[
                    {type: "checkbox", fixed:"left", width:50},
                    {field: 'newsId', title: 'ID', width:60, align:"center",style:"display:none"},
                    {field: 'newsName', title: '文章标题', width:350},
                    {field: 'newsAuthor', title: '发布者', align:'center'},
                    {field: 'newsStatus', title: '发布状态',  align:'center',templet:"#newsStatus"},
                    {field: 'newsLook', title: '浏览权限', align:'center',templet:"#newsLook"},
                    {field: 'newsTop', title: '是否置顶', align:'center', templet:function(d){
                            return '<input type="checkbox" name="newsTop" lay-filter="newsTop" lay-skin="switch" lay-text="是|否" '+d.newsTop+'>'
                        }},
                    {field: 'newsTime', title: '发布时间', align:'center', minWidth:110, templet:function(d){
                            return d.newsTime.substring(0,10);
                        }},
                    {title: '操作', width:170, templet:'#newsListBar',fixed:"right",align:"center"}
                ]],
                done: function () {
                    $("[data-field='newsId']").css('display','none');
                }
            })
        }else{//搜索为空时服务器端查询所有
            // layer.msg("请输入搜索的内容");
        }
    });

    //添加文章
    function addNews(edit){
        var index = layui.layer.open({
            title : "添加文章",
            type : 2,
            content : "newsAdd.html",
            success : function(layero, index){
                var body = layui.layer.getChildFrame('body', index);
                if(edit){
                    body.find(".newsName").val(edit.newsName);
                    body.find(".abstract").val(edit.newsAbstract);
                    body.find(".thumbImg").attr("src",edit.newsImg);
                    body.find("#news_content").val(edit.content);
                    body.find(".newsStatus select").val(edit.newsStatus);
                    body.find(".openness input[name='openness'][title='"+edit.newsLook+"']").prop("checked","checked");
                    body.find(".newsTop input[name='newsTop']").prop("checked",edit.newsTop);
                    form.render();
                }
                setTimeout(function(){
                    layui.layer.tips('点击此处返回文章列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                },500)
            }
        })
        layui.layer.full(index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize",function(){
            layui.layer.full(index);
        })
    }
    //修改文章
    function updateNews(edit){
        var index = layui.layer.open({
            title : "修改文章",
            type : 2,
            content : "newsUpdate.html",
            success : function(layero, index){
                var body = layui.layer.getChildFrame('body', index);
                if(edit){
                    body.find(".newsId").val(edit.newsId);
                    body.find(".newsName").val(edit.newsName);
                    body.find(".abstract").val(edit.newsAbstract);
                    body.find(".thumbImg").attr("src",edit.newsImg);
                    body.find("#news_content").val(edit.content);
                    body.find(".newsStatus select").val(edit.newsStatus);
                    body.find(".openness input[name='openness'][title='"+edit.newsLook+"']").prop("checked","checked");
                    body.find(".newsTop input[name='newsTop']").prop("checked",edit.newsTop);
                    form.render();
                }
                setTimeout(function(){
                    layui.layer.tips('点击此处返回文章列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                },500)
            }
        })
        layui.layer.full(index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize",function(){
            layui.layer.full(index);
        })
    }
    $(".addNews_btn").click(function(){
        addNews();
    })

    //批量删除
    $(".delAll_btn").click(function(){
        var checkStatus = table.checkStatus('newsListTable'),
            data = checkStatus.data,
            newsId = [];
        if(data.length > 0) {
            for (var i in data) {
                newsId.push(data[i].newsId);
            }
            layer.confirm('确定删除选中的文章？', {icon: 3, title: '提示信息'}, function (index) {
                 $.get("/news/batch_delete",{
                     nids : newsId  //将需要删除的newsId作为参数传入
                 },function(data){
                     if (data.status==200){
                         top.layer.msg("用户删除成功！");
                     }else{
                         top.layer.msg(data.msg);
                     }
                     tableIns.reload();
                     layer.close(index);
                 })
            })
        }else{
            layer.msg("请选择需要删除的文章");
        }
    })

    //列表操作
    table.on('tool(newsList)', function(obj){
        var layEvent = obj.event,
            data = obj.data;

        if(layEvent === 'edit'){ //编辑
            updateNews(data);
        } else if(layEvent === 'del'){ //删除
            layer.confirm('确定删除此文章？',{icon:3, title:'提示信息'},function(index){
                 $.get("/news/delete",{
                     newsId : data.newsId  //将需要删除的newsId作为参数传入
                 },function(data){
                    if (data.status==200){
                        top.layer.msg("用户删除成功！");
                    }else{
                        top.layer.msg(data.msg);
                    }
                    tableIns.reload();
                    layer.close(index);
                 })
            });
        } else if(layEvent === 'look'){ //预览
            layer.alert("此功能需要前台展示，实际开发中传入对应的必要参数进行文章内容页面访问")
        }
    });

})
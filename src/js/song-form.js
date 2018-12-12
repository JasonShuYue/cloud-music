{
    let view = {
        element: '.admin-wrapper main',
        template: `
            <p class="title">新建歌曲</p>
            <form class="song-form">
                <label for="">歌名:<input type="text" name="name" class="song-name" value="__name__"></label>
                <label for="">歌手:<input type="text" name="singer" class="singer-name" value="__singer__"></label>
                <label for="">外链:<input type="text" name="url" class="song-name" value="__url__"></label>
                <button type="submit" class="submit-bt">保存</button>
            </form>
        `,
        render(data = {}) {
            let placeholder = ["name", "singer", "url"];
            let html = this.template;
            placeholder.map((string) => {
                html = html.replace(`__${string}__`, data[string] || "");
            });
            $(this.element).html(html);
        },
        reset() {
            this.render({});
        }
    };

    let model = {
        data: {
            name: '',
            singer: '',
            url: '',
            id: '',
        },
        create(data) {
            // 声明类型
            var Song = AV.Object.extend('Song');
            // 新建对象
            var song = new Song();
            // 设置名称
            song.set('name', data.name);
            song.set('singer', data.singer);
            song.set('url', data.url);
            // 设置优先级
            return song.save().then((newSong) => {
                let {id, attributes} = newSong;
                // this.data = {id, ...attributes};
                Object.assign(this.data, {id, ...attributes});
            }, (error) => {
                console.error(error);
            });
        }
    };

    let controller = {
        init(view, model) {
          this.view = view;
          this.model = model;
          this.view.render(this.model.data);
          this.bindEvents();
          window.eventHub.on("upload", (data) => {
              this.view.render(data);
          });
        },
        bindEvents() {
            $(this.view.element).on("submit", "form", (e) => {
                e.preventDefault();
                let needs = ["name", "singer", "url"];
                let data = {};
                needs.map((key) => {
                    data[key] = $(this.view.element).find(`input[name="${key}"]`).val();
                });
                this.model.create(data)
                    .then(()=>{
                        this.view.reset();
                        // console.log("123", this.model.data);
                        let string = JSON.stringify(this.model.data);
                        let object = JSON.parse(string);
                        window.eventHub.emit("create", object);
                    });
            })
        }
    };

    controller.init(view, model);
}
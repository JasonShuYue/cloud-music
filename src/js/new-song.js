{
    let view = {
        element: '.create-song',
        template: `
            <p>新建歌曲</p>
        `,
        render(data) {
            $(this.element).html(this.template);
        }
    };

    let model = {};

    let controller = {
        init(view, model) {
            this.view = view;
            this.model = model;
            this.view.render(this.model.data);
            window.eventHub.on("upload", (data) => {
                this.active();
            });
        },
        active() {
            $(this.view.element).addClass('active');
        }
    };

    controller.init(view, model);
}
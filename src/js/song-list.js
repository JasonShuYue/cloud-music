{
    let view = {
        element: '.song-list-container',
        template: `
            <ul class="song-list">
            </ul>
        `,
        render(data) {
            $(this.element).html(this.template);
            let {songs} = data;
            let liList = songs.map((song) => {
               return $('<li></li>').text(song.name);
            });
            $(this.element).find('ul').empty();
            liList.map((domLi) => {
                $(this.element).find('ul').append(domLi);
            })
        }
    };

    let model = {
        data: {
            songs: []
        },
    };

    let controller = {
        init(view, model) {
            this.view = view;
            this.model = model;
            this.view.render(this.model.data);
            window.eventHub.on("upload", (data) => {
                console.log("new song 模块得到了data")
                console.log(data);
            });

            window.eventHub.on("create", (data) => {
                this.model.data.songs.push(data);
                this.view.render(this.model.data);
            });

        },
    };


    controller.init(view, model);

}
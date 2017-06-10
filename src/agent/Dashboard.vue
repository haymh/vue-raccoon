<template>
<!--<div class="columns content-container">-->
    <!--<div class="column is-half left-container">-->
    <!--</div>-->
    <!--<div class="column is-half right-container">-->
        <!--<ShareList class="share-list" title="预定分享" :list="list" :plus="true" :removable="true" :editable="true"></ShareList>-->
        <!--<ShareList class="share-list" title="历史分享" :list="list"></ShareList>-->
    <!--</div>-->
<!--</div>-->
    <div class="container">
        <div class="tile is-ancestor">
            <div class="tile is-parent">
                <div class="tile is-parent is-vertical">
                    <article class="tile is-child notification is-info">
                        <div class="content">
                            <p class="title">Contacts</p>
                            <p class="subtitle">With even more content</p>
                            <div class="content">
                                <!-- Content -->
                            </div>
                        </div>
                    </article>
                    <article class="tile is-child notification is-success">
                        <div class="content">
                            <p class="title">Profile</p>
                            <p class="subtitle">With even more content</p>
                            <div class="content">
                                <!-- Content -->
                            </div>
                        </div>
                    </article>
                </div>
            </div>
            <div class="tile is-parent is-8">
                <div class="tile is-parent is-vertical">
                    <article class="tile is-child notification is-warning">
                        <p class="title">LEAD</p>
                        <p class="subtitle">Aligned with the right tile</p>
                        <div class="content">
                            LEAD
                        </div>
                    </article>
                    <article class="tile is-child notification">
                        <p class="title">Wide tile</p>
                        <p class="subtitle">Aligned with the right tile</p>
                        <div class="content">
                            <div class="tabs is-fullwidth">
                                <ul>
                                    <li class="is-active">
                                        <a>Future Share</a>
                                    </li>
                                    <li>
                                        <a>Share History</a>
                                    </li>
                                </ul>
                            </div>
                            <ShareList class="share-list" title="预定分享" :list="list" :plus="true" :removable="true" :editable="true"></ShareList>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </div>

</template>

<style>
.content-container {
    height: calc(100vh - 54px);
    max-width: 1300px;
    margin: auto;
}
.right-container {
    height: 100%;
    margin-left: 4px;
    margin-right: 4px;
    padding: 0;
}
.share-list {
    height: calc(50% - 4px);
    margin-left: 4px;
    margin-right: 4px;
    margin-top: 4px;
    padding: 10px;
}
</style>

<script>
import ShareList from '../agent/components/share/ShareList.vue';

export default {
  name: 'Dashboard',
  data() {
    return {
      headers: [
        {
          text: 'Share Schedule',
          left: true,
          sortable: false,
          value: 'Schedule',
        },
        { text: 'Created At', value: 'Created' },
        { text: 'Share Title', value: 'Title' },
        { text: 'Customer Group', value: 'Customers' },
      ],
      list: [
        {
          shareTime: 'Every week',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Group A',
        },
        {
          shareTime: 'Every day',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Group B',
        },
        {
          shareTime: '2017/03/23',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Jeremy',
        },
        {
          shareTime: 'Every week',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Group A',
        },
        {
          shareTime: 'Every day',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Group B',
        },
        {
          shareTime: '2017/03/23',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Jeremy',
        },
        {
          shareTime: 'Every week',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Group A',
        },
        {
          shareTime: 'Every day',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Group B',
        },
        {
          shareTime: '2017/03/23',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Jeremy',
        },
        {
          shareTime: 'Every week',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Group A',
        },
        {
          shareTime: 'Every day',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Group B',
        },
        {
          shareTime: '2017/03/23',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Jeremy',
        },
      ],
    };
  },
  components: {
    ShareList,
  },
};
</script>

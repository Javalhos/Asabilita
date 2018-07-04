<template>
	<div :class="`alert ${types[type]} alert-dismissible fade show`" role="alert">
		{{ body }}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <i class="fa fa-close"></i>
    </button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			types: {
        'SUCCESS': 'alert-success',
        'WARNING': 'alert-warning',
        'DANGER': 'alert-danger',
        'INFO': 'alert-info'
      }
		};
	},
	props: ['type', 'title', 'body']
}
</script>

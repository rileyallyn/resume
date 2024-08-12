<script lang="ts">
  import Subtitle from "./subtitle.svelte";
  export let title: string;
  export let id: string;
</script>

<section {id} class="mt-2">
  <Subtitle>{title}</Subtitle>
  <div class="p-1">
    <slot />
  </div>
</section>

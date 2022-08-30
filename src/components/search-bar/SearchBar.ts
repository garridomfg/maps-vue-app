import { defineComponent, ref, computed } from "vue";
import SearchResults from "../search-results/SearchResults.vue";
import { usePlacesStore } from "../../composables/usePlacesStore";

export default defineComponent({
  name: "SearchBar",
  components: { SearchResults },
  setup() {
    const debounceValue = ref("");
    const debounceTimer = ref();
    const { searchPlacesByTerm } = usePlacesStore();

    return {
      debounceValue,

      searchTerm: computed({
        get() {
          return debounceValue.value;
        },
        set(val: string) {
          if (debounceTimer.value) clearTimeout(debounceTimer.value);

          debounceTimer.value = setTimeout(() => {
            debounceValue.value = val;
            searchPlacesByTerm(debounceValue.value);
          }, 500);
        },
      }),
    };
  },
});

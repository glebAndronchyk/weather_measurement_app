import type { FiltersObjectChangePayload } from "../../../../../shared/components/GenericFilters/GenericFilters.types.ts";
import { useMapViewPageViewModel } from "../../../../../app/routing/pages/MapViewPage/viewmodel";
import { useMapControlsViewModel } from "../../../viewmodel";

interface UpdateStateDTO {
  sp: URLSearchParams;
  lookupType: "area" | "pagination";
}

export const useMapViewPageBinding = () => {
  const { bind } = useMapViewPageViewModel();
  const { updateViewModelState: updateMapControlsState } =
    useMapControlsViewModel();

  const _updatePageVM = (dto: UpdateStateDTO) => {
    const { sp, lookupType } = dto;

    bind("measurementsFilter", sp);
    bind("measurementsLookupType", lookupType);
  };

  const _updateLocalState = (dto: UpdateStateDTO) => {
    const { sp, lookupType } = dto;

    updateMapControlsState({
      type: "setFilters",
      payload: sp,
    });

    if (lookupType) {
      updateMapControlsState({
        type: "setLookupType",
        // todo
        payload: lookupType as never,
      });
    }
  };

  const handleFilterChange = (_: never, value: FiltersObjectChangePayload) => {
    const { lookupType = "area", ...searchParams } = value;
    const sp = new URLSearchParams(searchParams as Record<string, string>);
    const updateDTO: UpdateStateDTO = {
      sp,
      lookupType: lookupType as "area" | "pagination",
    };

    _updatePageVM(updateDTO);
    _updateLocalState(updateDTO);
  };

  return {
    handleFilterChange,
  };
};

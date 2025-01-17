import { withOrganizationsEnabledGuard } from '../../common';
import { useCoreOrganizationList, withCoreUserGuard } from '../../contexts';
import { Flow } from '../../customizables';
import { Popover, withCardStateProvider, withFloatingTree } from '../../elements';
import { usePopover } from '../../hooks';
import { OrganizationSwitcherPopover } from './OrganizationSwitcherPopover';
import { OrganizationSwitcherTrigger } from './OrganizationSwitcherTrigger';
import { organizationListParams } from './utils';

const _OrganizationSwitcher = withFloatingTree(() => {
  const { floating, reference, styles, toggle, isOpen, nodeId, context } = usePopover({
    placement: 'bottom-start',
    offset: 8,
  });

  /**
   * Prefetch user invitations and suggestions
   */
  useCoreOrganizationList(organizationListParams);

  return (
    <Flow.Root flow='organizationSwitcher'>
      <OrganizationSwitcherTrigger
        ref={reference}
        onClick={toggle}
        isOpen={isOpen}
      />
      <Popover
        nodeId={nodeId}
        context={context}
        isOpen={isOpen}
      >
        <OrganizationSwitcherPopover
          close={toggle}
          ref={floating}
          style={{ ...styles }}
        />
      </Popover>
    </Flow.Root>
  );
});

export const OrganizationSwitcher = withOrganizationsEnabledGuard(
  withCoreUserGuard(withCardStateProvider(_OrganizationSwitcher)),
  'OrganizationSwitcher',
  { mode: 'hide' },
);

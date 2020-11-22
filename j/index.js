     $(function() {
         $('[data-toggle="popover"]').popover();

         $("#contact").on('show.bs.modal', function(e) {
             console.log('el modal se esta mostrando');

             $("#contactobtn").removeClass('btn - outline - info');
             $("#contactobtn").addClass('btn-info');
             $("#contactobtn").prop('disabled', true);


         });
         $("#contact").on('shown.bs.modal', function(e) {
             console.log('el modal se mostro');

         });

         $("#contact").on('hidden.bs.modal', function(e) {
             console.log('el modal esta oculto');

         });

         $("#contact").on('hide.bs.modal', function(e) {
             console.log('el modal se oculto');

         });
     });